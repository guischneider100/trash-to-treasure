package com.example.schneider.trash_to_treasure.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.schneider.trash_to_treasure.dto.ItemDTO;
import com.example.schneider.trash_to_treasure.entity.Item;
import com.example.schneider.trash_to_treasure.entity.ItemFavorite;
import com.example.schneider.trash_to_treasure.entity.User;
import com.example.schneider.trash_to_treasure.mapper.ItemMapper;
import com.example.schneider.trash_to_treasure.repository.ItemFavoriteRepository;
import com.example.schneider.trash_to_treasure.repository.ItemRepository;
import com.example.schneider.trash_to_treasure.security.CustomUserDetails;

@Service
public class ItemFavoriteService {
    
    private final ItemFavoriteRepository itemFavoriteRepository;
    private final ItemRepository itemRepository;
    private final UserService userService;
    private final ItemMapper itemMapper;

    public ItemFavoriteService(ItemFavoriteRepository itemFavoriteRepository, ItemRepository itemRepository, UserService userService, ItemMapper itemMapper) {
        this.itemFavoriteRepository = itemFavoriteRepository;
        this.itemRepository = itemRepository;
        this.userService = userService;
        this.itemMapper = itemMapper;
    }

    public ItemDTO.Response save(Long itemId){
        Authentication auth =  SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails user = (CustomUserDetails) auth.getPrincipal();

        User existingUser = userService.getByIdOrThrow(user.getId());
        Item existingItem = itemRepository.findById(itemId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found"));
        
        Optional<ItemFavorite> existingItemFav = itemFavoriteRepository.findByItemIdAndUserId(itemId, user.getId());

        if(existingItemFav.isPresent()) {
            itemFavoriteRepository.delete(existingItemFav.get());
        } else {
            itemFavoriteRepository.save(new ItemFavorite(existingUser, existingItem));
        }

        return itemMapper.toDTO(existingItem);
    }

    public List<ItemDTO.Response> findAllFavoritedByUser(){
        Authentication auth =  SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails user = (CustomUserDetails) auth.getPrincipal();
        
        return itemFavoriteRepository.findFavoritedItensByUser(user.getId())
                                     .stream()
                                     .map(itemMapper::toDTO)
                                     .collect(Collectors.toList());
    }

    //Check and set if the item is favorite to the user or not
    public ItemDTO.Response retrieveItemFavorites(Item item){
        Authentication auth =  SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails user = (CustomUserDetails) auth.getPrincipal();

        ItemDTO.Response dto = itemMapper.toDTO(item);
        dto.setIsFavorite(itemFavoriteRepository.findByItemIdAndUserId(item.getId(), user.getId()).isPresent());
        
        return dto;
    }
}
