package org.shop.api;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.boot.SpringApplication;

import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;

@Slf4j
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void applicationReadyEvent() {
        log.info("\n\n******************* Server has been started successfully at:{}.. **********************\n",
                LocalDateTime.now());
    }
}
