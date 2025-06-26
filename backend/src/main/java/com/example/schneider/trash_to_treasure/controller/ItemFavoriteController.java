package com.example.schneider.trash_to_treasure.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.schneider.trash_to_treasure.dto.ItemFavoriteDTO;
import com.example.schneider.trash_to_treasure.repository.ItemRepository;
import com.example.schneider.trash_to_treasure.service.ItemFavoriteService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/item_favorite")
public class ItemFavoriteController {
    
    private final ItemFavoriteService itemFavoriteService;

    public ItemFavoriteController(ItemFavoriteService itemFavoriteService){
        this.itemFavoriteService = itemFavoriteService;
    }

    //Request to save the favorite item
    @PostMapping
    public ResponseEntity<ItemFavoriteDTO.Response> save(@RequestBody @Valid ItemFavoriteDTO.Create itemFavoriteCreateDTO) {
        return new ResponseEntity<>(itemFavoriteService.save(itemFavoriteCreateDTO), HttpStatus.CREATED);
    }

    //Request to get the favorite item's info by user id
    @GetMapping
    public ResponseEntity<List<ItemFavoriteDTO.Response>> findByUserId(@RequestParam Integer id) {
        return ResponseEntity.ok(itemFavoriteService.findByUserId(id));
    }

    //Request to get the favorite item's info by id
    @GetMapping("/{id}")
    public ResponseEntity<ItemFavoriteDTO.Response> findById(@PathVariable Integer id) {
        return ResponseEntity.ok(itemFavoriteService.findById(id));
    }

    //Request to delete a favorite item by id
    @DeleteMapping("/{id}")
    public ResponseEntity<ItemFavoriteDTO.Response> delete(@PathVariable Integer id){
        itemFavoriteService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
