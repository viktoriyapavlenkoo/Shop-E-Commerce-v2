package org.shop.api.common;

import org.shop.api.orm.entity.ItemsItem;
import org.shop.api.dto.ProductDTO;

import static java.util.Objects.isNull;

public class Utils {

    public static ProductDTO convertItemsItemToItemDTO(ItemsItem itemsItem) {
        ProductDTO productDTO = new ProductDTO();
        productDTO.setId(itemsItem.getId());
        productDTO.setName(itemsItem.getName());
        productDTO.setImageUrl(itemsItem.getImageUrl());
        productDTO.setDescription(itemsItem.getDescription());
        productDTO.setPrice(itemsItem.getPrice() + " " + (isNull(itemsItem.getCurrencyEnum()) ?
                null : itemsItem.getCurrencyEnum().getCurrency()));
        return productDTO;
    }

}
