package com.example.schneider.trash_to_treasure.service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.example.schneider.trash_to_treasure.dto.ItemDTO;
import com.example.schneider.trash_to_treasure.entity.Item;
import com.example.schneider.trash_to_treasure.mapper.ItemMapper;
import com.example.schneider.trash_to_treasure.repository.ItemFavoriteRepository;
import com.example.schneider.trash_to_treasure.repository.ItemRepository;
import com.example.schneider.trash_to_treasure.security.CustomUserDetails;

@Service
public class ItemService {

    private final ItemRepository itemRepository;
    private final ItemFavoriteService itemFavoriteService;
    private final ItemMapper itemMapper;
    private final ImageService imageService;
    private final UserService userService;

    public ItemService(ItemRepository itemRepository, ItemMapper itemMapper, ItemFavoriteService itemFavoriteService, UserService userService, ImageService imageService){
        this.itemRepository = itemRepository;
        this.itemMapper = itemMapper;
        this.itemFavoriteService = itemFavoriteService;
        this.userService = userService;
        this.imageService = imageService;
    }

    public List<ItemDTO.Response> findAll(){
        List<Item> itemList = itemRepository.findAll();

        return itemList.stream()
            .map(itemFavoriteService::retrieveItemFavorites)
            .collect(Collectors.toList());
    }

    public ItemDTO.Response save(ItemDTO.Create itemCreateDTO, MultipartFile file){
        Authentication auth =  SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails user = (CustomUserDetails) auth.getPrincipal();

        Item itemSa = itemMapper.toEntity(itemCreateDTO);
        itemSa.setPhotoUrl(imageService.uploadImage(file));
        itemSa.setPostedAt(Instant.now());
        itemSa.setPostedBy(userService.getByIdOrThrow(user.getId()));

        return itemMapper.toDTO(itemRepository.save(itemSa));
    }

    public ItemDTO.Response findById(Long id){
        Item item = itemRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found"));
        return itemFavoriteService.retrieveItemFavorites(item);
    }
    
    public List<ItemDTO.Response> findByCordinates(Double latitudeUser, Double longitudeUser, Double area){

        double earthRadius = 6371.0;
        double deltaLat = area / earthRadius;
        double deltaLon = area / (earthRadius * Math.cos(Math.toRadians(latitudeUser)));
        
        double minLat = latitudeUser - Math.toDegrees(deltaLat);
        double maxLat = latitudeUser + Math.toDegrees(deltaLat);

        double minLon = longitudeUser - Math.toDegrees(deltaLon);
        double maxLon = longitudeUser + Math.toDegrees(deltaLon);

        List<Item> items = itemRepository.findByCordinates(minLat, maxLat, minLon, maxLon);
        return items.stream()
                    .map(itemMapper::toDTO)
                    .collect(Collectors.toList());
    }

    public List<ItemDTO.Response> findPostedByUser() {
        Authentication auth =  SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails user = (CustomUserDetails) auth.getPrincipal();

        return itemRepository.findByPostedBy(userService.getByIdOrThrow(user.getId())).stream()
                                                  .map(itemMapper::toDTO)
                                                  .collect(Collectors.toList());
    }

    public List<ItemDTO.Response> findCollectedByUser() {
        Authentication auth =  SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails user = (CustomUserDetails) auth.getPrincipal();

        return itemRepository.findByCollectedBy(userService.getByIdOrThrow(user.getId())).stream()
                                                     .map(itemMapper::toDTO)
                                                     .collect(Collectors.toList());
    }
    
    public ItemDTO.Response update(Long id, ItemDTO.Update itemNewData){
        Item existingItem = itemRepository.findById(id)
                                          .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found"));

        itemMapper.updateEntityFromDTO(itemNewData, existingItem);
        return itemMapper.toDTO(itemRepository.save(existingItem));
    }

    public ItemDTO.Response collectItem(Long id) {
        Authentication auth =  SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails user = (CustomUserDetails) auth.getPrincipal();

        Item existingItem = itemRepository.findById(id)
                                          .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found"));

        if(existingItem.getCollectedBy() != null){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Item already taken");
        }

        existingItem.setCollectedBy(userService.getByIdOrThrow(user.getId()));

        return itemMapper.toDTO(itemRepository.save(existingItem));
    }

    public void deleteById(Long id){
        Authentication auth =  SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails user = (CustomUserDetails) auth.getPrincipal();
        
        Item item = itemRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found"));

        if(!item.getPostedBy().equals(userService.getByIdOrThrow(user.getId()))) 
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid Credentials");

        itemFavoriteService.deleteByItem(item, userService.getByIdOrThrow(user.getId()));

        itemRepository.deleteById(id);
    }
}
