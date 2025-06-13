package com.example.schneider.trash_to_treasure.repository;

import com.example.schneider.trash_to_treasure.entity.ItemFavorite;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface ItemFavoriteRepository extends JpaRepository<ItemFavorite, Integer> {
    //Additional query methods can be defined here if needed

    List<ItemFavorite> findByUserId(Integer userId);
}
