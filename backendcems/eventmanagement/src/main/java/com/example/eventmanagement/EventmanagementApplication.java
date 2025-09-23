package com.example.eventmanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer; // <-- add this import

@SpringBootApplication
public class EventmanagementApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(EventmanagementApplication.class, args);
    }
}
