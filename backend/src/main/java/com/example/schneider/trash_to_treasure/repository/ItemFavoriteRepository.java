package com.example.schneider.trash_to_treasure.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.schneider.trash_to_treasure.entity.ItemFavorite;


public interface ItemFavoriteRepository extends JpaRepository<ItemFavorite, Long> {

    List<ItemFavorite> findByUserId(Long userId);

    Optional<ItemFavorite> findByItemIdAndUserId(Long itemId, Long userId);
}
