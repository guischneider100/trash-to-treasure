package com.example.schneider.trash_to_treasure.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.schneider.trash_to_treasure.dto.ItemDTO;
import com.example.schneider.trash_to_treasure.entity.Item;
import com.example.schneider.trash_to_treasure.entity.ItemFavorite;
import com.example.schneider.trash_to_treasure.entity.User;
import com.example.schneider.trash_to_treasure.mapper.ItemMapper;
import com.example.schneider.trash_to_treasure.repository.ItemFavoriteRepository;
import com.example.schneider.trash_to_treasure.repository.ItemRepository;
import com.example.schneider.trash_to_treasure.repository.UserRepository;

@Service
public class ItemFavoriteService {
    
    private final ItemFavoriteRepository itemFavoriteRepository;
    private final ItemRepository itemRepository;
    private final UserRepository userRepository;
    private final ItemMapper itemMapper;

    public ItemFavoriteService(ItemFavoriteRepository itemFavoriteRepository, ItemRepository itemRepository, UserRepository userRepository, ItemMapper itemMapper) {
        this.itemFavoriteRepository = itemFavoriteRepository;
        this.itemRepository = itemRepository;
        this.userRepository = userRepository;
        this.itemMapper = itemMapper;
    }

    public ItemDTO.Response save(Long itemId, Long userId){
        
        Optional<ItemFavorite> existingItemFav = itemFavoriteRepository.findByItemIdAndUserId(itemId, userId);
        User existingUser = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found")); 
        Item existingItem = itemRepository.findById(itemId).orElseThrow(() -> new RuntimeException("Item not found"));

        if(existingItemFav.isPresent()) {
            itemFavoriteRepository.delete(existingItemFav.get());
        } else {
            itemFavoriteRepository.save(new ItemFavorite(existingUser, existingItem));
        }

        return itemMapper.toDTO(existingItem);
    }

    public void deleteById(Long id){
        itemFavoriteRepository.deleteById(id);
    }
}
