package com.example.schneider.trash_to_treasure.mapper;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.example.schneider.trash_to_treasure.dto.ItemDTO;
import com.example.schneider.trash_to_treasure.entity.Item;

@Mapper(componentModel = "spring")
public interface ItemMapper {

    @Mapping(source = "postedBy.id", target = "postedByUserId")
    ItemDTO.Response toDTO(Item item);

    @Mapping(source = "postedByUserId", target = "postedBy.id")
    Item toEntity(ItemDTO.Create itemDTO);
    
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDTO(ItemDTO.Update itemUpdateDTO, @MappingTarget Item item);
}
