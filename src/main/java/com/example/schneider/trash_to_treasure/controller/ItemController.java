package com.example.schneider.trash_to_treasure.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.schneider.trash_to_treasure.dto.ItemDTO;
import com.example.schneider.trash_to_treasure.service.ItemService;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/api/item")
public class ItemController {

    private final ItemService itemService;

    public ItemController(ItemService itemService){
        this.itemService = itemService;
    }

    //Request to save the item
    @PostMapping
    public ResponseEntity<ItemDTO.Response> save(@RequestBody @Valid ItemDTO.Create itemCreateDTO){
        return new ResponseEntity<>(itemService.save(itemCreateDTO), HttpStatus.CREATED);
    }

    //Request to get the item's info by cordinates
    @GetMapping
    public ResponseEntity<List<ItemDTO.Response>> findByCordinates(@RequestParam Double latitude, @RequestParam Double longitude, @RequestParam Double area){
        return ResponseEntity.ok(itemService.findByCordinates(latitude, longitude, area));
    }
    
    //Request to get the item's info by id
    @GetMapping("/{id}")
    public ResponseEntity<ItemDTO.Response> findById(@PathVariable Integer id) {
        return ResponseEntity.ok(itemService.findById(id));
    }
    
    //Request to update an item by id
    @PutMapping("/{id}")
    public ResponseEntity<ItemDTO.Response> update(@PathVariable Integer id, @RequestBody @Valid ItemDTO.Update itemUpdateDTO){
        return ResponseEntity.ok(itemService.update(id, itemUpdateDTO));
    }

    //Request to delete an item by id
    @DeleteMapping
    public ResponseEntity<ItemDTO.Response> delete(@PathVariable Integer id){
        itemService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
