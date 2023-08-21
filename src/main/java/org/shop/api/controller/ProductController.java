package org.shop.api.controller;

import lombok.extern.log4j.Log4j2;
import org.shop.api.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;


@Log4j2
@Controller
@RequestMapping("/product")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

/*
    @GetMapping
    public String productPage() {
        return "single-product";
    }
*/

    @GetMapping("/{productId}")
    public ModelAndView product(@PathVariable int productId, @ModelAttribute ModelAndView modelAndView) {
        modelAndView.setViewName("single-product");
        modelAndView.addObject("product", productService.getProductById(productId));
        return modelAndView;
    }
}
