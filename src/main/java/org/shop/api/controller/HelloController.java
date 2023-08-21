package org.shop.api.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.stereotype.Controller;

@Log4j2
@Controller
@RequestMapping
public class HelloController {

    @GetMapping("/")
    public String index() {
        return "index";
    }

}
