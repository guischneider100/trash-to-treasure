package com.example.schneider.trash_to_treasure.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.schneider.trash_to_treasure.dto.ItemDTO;
import com.example.schneider.trash_to_treasure.service.ItemFavoriteService;

@RestController
@RequestMapping("/api/item_favorite")
public class ItemFavoriteController {
    
    private final ItemFavoriteService itemFavoriteService;

    public ItemFavoriteController(ItemFavoriteService itemFavoriteService){
        this.itemFavoriteService = itemFavoriteService;
    }
    
    @GetMapping("/user")
    public ResponseEntity<List<ItemDTO.Response>> getAllFavoritedByUser() {
        return ResponseEntity.ok(itemFavoriteService.findAllFavoritedByUser());
    }

    //Request to save the favorite item
    @PatchMapping("/{itemId}")
    public ResponseEntity<ItemDTO.Response> save(@PathVariable Long itemId) {
        return ResponseEntity.ok(itemFavoriteService.save(itemId));
    }
}
