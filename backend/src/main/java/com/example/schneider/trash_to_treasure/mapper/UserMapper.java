package com.example.schneider.trash_to_treasure.mapper;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.example.schneider.trash_to_treasure.dto.UserDTO;
import com.example.schneider.trash_to_treasure.entity.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
    
    UserDTO.Response toDTO(User user);

    User toEntity(UserDTO.Create userCreateDTO);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDTO(UserDTO.Create userCreateDTO, @MappingTarget User user);

}
