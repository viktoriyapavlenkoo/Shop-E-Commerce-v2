package org.shop.api.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDTO {
    private Integer id;

    private String imageUrl;

    private String name;

    private String Description;

    private String price;

}
