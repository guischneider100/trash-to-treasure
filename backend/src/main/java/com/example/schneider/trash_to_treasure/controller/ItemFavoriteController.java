package com.example.schneider.trash_to_treasure.controller;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.schneider.trash_to_treasure.dto.ItemDTO;
import com.example.schneider.trash_to_treasure.entity.User;
import com.example.schneider.trash_to_treasure.repository.UserRepository;
import com.example.schneider.trash_to_treasure.service.ItemFavoriteService;

@RestController
@RequestMapping("/api/item_favorite")
public class ItemFavoriteController {
    
    private final ItemFavoriteService itemFavoriteService;
    private final UserRepository userRepository;

    public ItemFavoriteController(ItemFavoriteService itemFavoriteService, UserRepository userRepository){
        this.itemFavoriteService = itemFavoriteService;
        this.userRepository = userRepository;
    }    

    //Request to save the favorite item
    @PatchMapping("/{itemId}")
    public ResponseEntity<ItemDTO.Response> save(@PathVariable Long itemId) {
        Optional<User> user = userRepository.findById(1l);
        return ResponseEntity.ok(itemFavoriteService.save(itemId, user.get().getId()));
    }
}
