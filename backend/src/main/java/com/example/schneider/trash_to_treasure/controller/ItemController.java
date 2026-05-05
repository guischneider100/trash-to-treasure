package com.example.schneider.trash_to_treasure.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.schneider.trash_to_treasure.dto.ItemDTO;
import com.example.schneider.trash_to_treasure.service.ItemService;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/api/item")
public class ItemController {

    private final ItemService itemService;

    public ItemController(ItemService itemService){
        this.itemService = itemService;
    }

    //save the item
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ItemDTO.Response> save(@RequestPart("data") @Valid String itemCreated, @RequestPart("file") MultipartFile file) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        ItemDTO.Create itemCreateDTO = mapper.readValue(itemCreated, ItemDTO.Create.class);
        return new ResponseEntity<>(itemService.save(itemCreateDTO, file), HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ItemDTO.Response>> findAll(){
        return ResponseEntity.ok(itemService.findAll());
    }

    //get the item's info by distance
    @GetMapping
    public ResponseEntity<List<ItemDTO.Response>> findByCordinates(@RequestParam Double lat, @RequestParam Double lon, @RequestParam Double area){
        return ResponseEntity.ok(itemService.findByCordinates(lat, lon, area));
    }
    
    //get the item's info by id
    @GetMapping("/{id}")
    public ResponseEntity<ItemDTO.Response> findById(@PathVariable Long id) {
        return ResponseEntity.ok(itemService.findById(id));
    }

    @GetMapping("/posted")
    public ResponseEntity<List<ItemDTO.Response>> findPostedByUser() {
        return ResponseEntity.ok(itemService.findPostedByUser());
    }

    @GetMapping("/collected")
    public ResponseEntity<List<ItemDTO.Response>> findCollectedByUser() {
        return ResponseEntity.ok(itemService.findCollectedByUser());
    }

    //collect an item by id
    @PatchMapping("/{itemId}/collect")
    public ResponseEntity<ItemDTO.Response> collectItem(@PathVariable Long itemId){
        return ResponseEntity.ok(itemService.collectItem(itemId));
    }

    //update an item by id
    // @PutMapping("/{id}")
    // public ResponseEntity<ItemDTO.Response> update(@PathVariable Long id, @Valid @RequestBody ItemDTO.Update itemUpdateDTO){
    //     return ResponseEntity.ok(itemService.update(id, itemUpdateDTO));
    // }

    //delete an item by id
    @DeleteMapping("/{id}")
    public ResponseEntity<ItemDTO.Response> delete(@PathVariable Long id){
        itemService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
