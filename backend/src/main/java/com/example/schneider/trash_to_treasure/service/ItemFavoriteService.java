package com.example.schneider.trash_to_treasure.service;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.schneider.trash_to_treasure.dto.ItemFavoriteDTO;
import com.example.schneider.trash_to_treasure.entity.ItemFavorite;
import com.example.schneider.trash_to_treasure.mapper.ItemFavoriteMapper;
import com.example.schneider.trash_to_treasure.repository.ItemFavoriteRepository;

@Service
public class ItemFavoriteService {
    
    private final ItemFavoriteRepository itemFavoriteRepository;
    private final ItemFavoriteMapper itemFavoriteMapper;

    public ItemFavoriteService(ItemFavoriteRepository itemFavoriteRepository, ItemFavoriteMapper itemFavoriteMapper) {
        this.itemFavoriteRepository = itemFavoriteRepository;
        this.itemFavoriteMapper = itemFavoriteMapper;
    }

    public ItemFavoriteDTO.Response save(ItemFavoriteDTO.Create itemFavoriteCreateDTO){
        return itemFavoriteMapper.toDTO(itemFavoriteRepository.save(itemFavoriteMapper.toEntity(itemFavoriteCreateDTO)));
    }

    public ItemFavoriteDTO.Response findById(Integer id){
        ItemFavorite itemFavorite = itemFavoriteRepository.findById(id)
                                                          .orElseThrow(() -> new RuntimeException("Item not found"));

        return itemFavoriteMapper.toDTO(itemFavorite);
    }

    /**
     * Converts a list of ItemFavorite entities to a list of ItemFavoriteDTOs using the mapper.
     *
     * Steps:
     * 1. Convert the list to a stream to process elements functionally.
     * 2. Map each ItemFavorite entity to an ItemFavoriteDTO using itemFavoriteMapper.toDTO().
     * 3. Collect the mapped ItemFavoriteDTOs into a new list.
     *
     * @param items List of ItemFavorite entities to convert.
     * @return List of ItemFavoriteDTOs.
    */
    public List<ItemFavoriteDTO.Response> findByUserId(Integer userId){
        List<ItemFavorite> items = itemFavoriteRepository.findByUserId(userId);

        return items.stream()
                    .map(itemFavoriteMapper::toDTO)
                    .collect(Collectors.toList());
    }

    public void deleteById(Integer id){
        itemFavoriteRepository.deleteById(id);
    }
}
