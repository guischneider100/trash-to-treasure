package com.example.schneider.trash_to_treasure.service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.schneider.trash_to_treasure.dto.ItemDTO;
import com.example.schneider.trash_to_treasure.entity.Item;
import com.example.schneider.trash_to_treasure.entity.User;
import com.example.schneider.trash_to_treasure.mapper.ItemMapper;
import com.example.schneider.trash_to_treasure.repository.ItemFavoriteRepository;
import com.example.schneider.trash_to_treasure.repository.ItemRepository;
import com.example.schneider.trash_to_treasure.repository.UserRepository;

@Service
public class ItemService {

    private final ItemFavoriteRepository itemFavoriteRepository;
    private final ItemRepository itemRepository;
    private final ItemMapper itemMapper;
    private final ImageService imageService;

    private final UserRepository userRepository;

    public ItemService(ItemRepository itemRepository, ItemMapper itemMapper, ItemFavoriteRepository itemFavoriteRepository, UserRepository userRepository, ImageService imageService){
        this.itemRepository = itemRepository;
        this.itemMapper = itemMapper;
        this.itemFavoriteRepository = itemFavoriteRepository;
        this.userRepository = userRepository;
        this.imageService = imageService;
    }

    public List<ItemDTO.Response> findAll(){
        List<Item> itemList = itemRepository.findAll();

        return itemList.stream()
            .map(this::retrieveItemFavorites)
            .collect(Collectors.toList());
    }

    public ItemDTO.Response save(ItemDTO.Create itemCreateDTO, MultipartFile file){
        Item itemSa = itemMapper.toEntity(itemCreateDTO);
        itemSa.setPhotoUrl(imageService.uploadImage(file));
        itemSa.setPostedAt(Instant.now());
        Optional<User> user = userRepository.findById(1l);
        itemSa.setPostedBy(user.get());
        return itemMapper.toDTO(itemRepository.save(itemSa));
    }

    public ItemDTO.Response findById(Long id){
        Item item = itemRepository.findById(id).orElseThrow(() -> new RuntimeException("Item not found"));
        return retrieveItemFavorites(item);
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
        Optional<User> user = userRepository.findById(1l);
        return itemRepository.findByPostedBy(user).stream()
                                                  .map(itemMapper::toDTO)
                                                  .collect(Collectors.toList());
    }

    public List<ItemDTO.Response> findCollectedByUser() {
        Optional<User> user = userRepository.findById(1l);
        return itemRepository.findByCollectedBy(user).stream()
                                                     .map(itemMapper::toDTO)
                                                     .collect(Collectors.toList());
    }
    
    public ItemDTO.Response update(Long id, ItemDTO.Update itemNewData){
        Item existingItem = itemRepository.findById(id)
                                          .orElseThrow(() -> new RuntimeException("Item not found"));

        itemMapper.updateEntityFromDTO(itemNewData, existingItem);
        return itemMapper.toDTO(itemRepository.save(existingItem));
    }

    public ItemDTO.Response collectItem(Long id) {

        Item existingItem = itemRepository.findById(id)
                                          .orElseThrow(() -> new RuntimeException("Item not found"));

        System.out.println("Esse collected: " + existingItem.getCollectedBy());

        if(existingItem.getCollectedBy() != null){
            throw new RuntimeException("Item already taken");
        }

        Optional<User> user = userRepository.findById(1l);
        existingItem.setCollectedBy(user.get());

        return itemMapper.toDTO(itemRepository.save(existingItem));
    }

    public void deleteById(Long id){
        itemRepository.deleteById(id);
    }

    //Check and set if the item is favorite to the user or not
    public ItemDTO.Response retrieveItemFavorites(Item item){
        Optional<User> user = userRepository.findById(1l);

        ItemDTO.Response dto = itemMapper.toDTO(item);
        dto.setIsFavorite(itemFavoriteRepository.findByItemIdAndUserId(item.getId(), user.get().getId()).isPresent());
        return dto;
    }
}
