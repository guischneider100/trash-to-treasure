package com.example.schneider.trash_to_treasure.repository;

import com.example.schneider.trash_to_treasure.entity.Item;
import com.example.schneider.trash_to_treasure.entity.User;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ItemRepository extends JpaRepository<Item, Long> {

    @Query("SELECT i FROM Item i WHERE i.latitude BETWEEN :minLat AND :maxLat AND i.longitude BETWEEN :minLon AND :maxLong")
    List<Item> findByCordinates(@Param("minLat") Double minLat, @Param("maxLat") Double maxLat, @Param("minLon") Double minLon, @Param("maxLong") Double maxLong);

    List<Item> findByPostedBy(User postedBy);

    List<Item> findByCollectedBy(User collectBy);
}
