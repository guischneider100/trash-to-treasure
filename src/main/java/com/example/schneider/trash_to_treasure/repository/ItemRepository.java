package com.example.schneider.trash_to_treasure.repository;

import com.example.schneider.trash_to_treasure.entity.Item;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ItemRepository extends JpaRepository<Item, Integer> {

    /**
     * Find items by coordinates within a specified area.
     * This method retrieves items that are within a certain distance (area) from the user's latitude and longitude.
     * @param latitudeUser User's latitude
     * @param longitudeUser User's longitude
     * @param area The area in degrees to search around the user's coordinates
     * @return List of items within the specified area
     */
    @Query("SELECT i FROM Item i WHERE i.latitude BETWEEN (:latitudeUser - :area) AND (:latitudeUser + :area) AND i.longitude BETWEEN (:longitudeUser - :area) AND (:longitudeUser + :area)")
    List<Item> findByCordinates(@Param("latitudeUser") Double latitudeUser, @Param("longitudeUser") Double longitudeUser, @Param("area") Double area);
}
