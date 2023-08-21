package org.shop.api.service;

import lombok.extern.log4j.Log4j2;
import org.shop.api.common.Utils;
import org.shop.api.dto.ProductDTO;
import org.shop.api.orm.entity.ItemsItem;
import org.shop.api.orm.repository.ProductRepository;
import org.springframework.stereotype.Service;

@Log4j2
@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public ProductDTO getProductById(int productId) {
        ItemsItem itemsItem = productRepository.findById(productId).orElse(new ItemsItem());
        return Utils.convertItemsItemToItemDTO(itemsItem);
    }
}
