package org.shop.api.orm.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import org.shop.api.orm.entity.ItemsItem;

import java.util.List;

@Repository
public interface ProductRepository extends PagingAndSortingRepository<ItemsItem, Integer> {
    List<ItemsItem> findAll();

}