package com.example.reactspringbootpackage.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
public class HelloController {
    @GetMapping("/api/hello")
    private String hello(){
        return "Hello, the time at the server is now "+new Date()+"\n";
    }
}
