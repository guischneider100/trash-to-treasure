package com.example.schneider.trash_to_treasure.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.schneider.trash_to_treasure.dto.ItemDTO;
import com.example.schneider.trash_to_treasure.entity.Item;
import com.example.schneider.trash_to_treasure.mapper.ItemMapper;
import com.example.schneider.trash_to_treasure.repository.ItemRepository;

@Service
public class ItemService {

    private final ItemRepository itemRepository;
    private final ItemMapper itemMapper;

    public ItemService(ItemRepository itemRepository, ItemMapper itemMapper){
        this.itemRepository = itemRepository;
        this.itemMapper = itemMapper;
    }

    public ItemDTO.Response save(ItemDTO.Create itemCreateDTO){
        return itemMapper.toDTO(itemRepository.save(itemMapper.toEntity(itemCreateDTO)));
    }

    public ItemDTO.Response findById(Integer id){
        Item item = itemRepository.findById(id).orElseThrow(() -> new RuntimeException("Item not found"));
        return itemMapper.toDTO(item);
    }
    
    /**
     * Converts a list of Item entities to a list of ItemDTOs using the mapper.
     *
     * Steps:
     * 1. Convert the list to a stream to process elements functionally.
     * 2. Map each Item entity to an ItemDTO using itemMapper.toDTO().
     * 3. Collect the mapped ItemDTOs into a new list.
     *
     * @param items List of Item entities to convert.
     * @return List of ItemDTOs.
     */
    public List<ItemDTO.Response> findByCordinates(Double latitudeUser, Double longitudeUser, Double area){
        List<Item> items = itemRepository.findByCordinates(latitudeUser, longitudeUser, area);
        return items.stream()
                    .map(itemMapper::toDTO)
                    .collect(Collectors.toList());
    }
    
    public ItemDTO.Response update(Integer id, ItemDTO.Update itemNewData){
        Item existingItem = itemRepository.findById(id)
                                          .orElseThrow(() -> new RuntimeException("Item not found"));

        //Update Entity with DTO data
        itemMapper.updateEntityFromDTO(itemNewData, existingItem);
        
        return itemMapper.toDTO(itemRepository.save(existingItem));
    }

    public void deleteById(Integer id){
        itemRepository.deleteById(id);
    }
}
