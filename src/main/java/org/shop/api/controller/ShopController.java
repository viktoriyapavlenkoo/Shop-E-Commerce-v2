package org.shop.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.http.ResponseEntity;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;

import org.shop.api.orm.repository.ProductRepository;
import org.shop.api.response.PageableResponse;
import org.shop.api.orm.entity.ItemsItem;
import org.shop.api.common.Utils;
import org.shop.api.dto.ProductDTO;

import lombok.extern.log4j.Log4j2;

import java.util.ArrayList;
import java.util.List;

@Log4j2
@Controller
@RequestMapping("/shop")
public class ShopController {

    private final ProductRepository productRepository;

    @Autowired
    public ShopController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping
    public String shop() {
        return "shop";
    }

    @GetMapping("/list")
    public ResponseEntity<?> getItems(@RequestParam(name = "size", defaultValue = "16") int size,
                                      @RequestParam(name = "page", defaultValue = "1") int page) {
        Page<ItemsItem> itemsItemList = productRepository.findAll(PageRequest.of(page - 1, size));
        PageableResponse<List<ProductDTO>> response = new PageableResponse<>();
        if (itemsItemList.isEmpty()) {
            response.errorResponse("Items not found");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
        response.setData(itemsItemList.stream().map(Utils::convertItemsItemToItemDTO).toList());
        response.setCount(itemsItemList.getTotalElements());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/add")
    public ResponseEntity<?> addDummy() {
        List<ItemsItem> itemsItemList = productRepository.findAll();
        List<ItemsItem> newItems = new ArrayList<>();
        itemsItemList.forEach(itemsItem -> {
            ItemsItem newItem = new ItemsItem();
            newItem.setImageUrl(itemsItem.getImageUrl());
            newItem.setName(itemsItem.getName());
            newItem.setPrice(itemsItem.getPrice());
            newItem.setDescription(itemsItem.getDescription());
            newItem.setCurrencyEnum(itemsItem.getCurrencyEnum());
            newItems.add(newItem);
        });
        productRepository.saveAll(newItems);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
