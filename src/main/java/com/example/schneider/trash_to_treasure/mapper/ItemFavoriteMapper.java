package com.example.schneider.trash_to_treasure.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.schneider.trash_to_treasure.dto.ItemFavoriteDTO;
import com.example.schneider.trash_to_treasure.entity.ItemFavorite;

@Mapper(componentModel = "spring")
public interface ItemFavoriteMapper {
    
    @Mapping(source = "item.id", target = "itemId")
    @Mapping(source = "user.id", target = "userId")
    ItemFavoriteDTO.Response toDTO(ItemFavorite itemFavorite);

    @Mapping(source = "itemId", target = "item.id")
    @Mapping(source = "userId", target = "user.id")
    ItemFavorite toEntity(ItemFavoriteDTO.Create itemFavorite);
}
