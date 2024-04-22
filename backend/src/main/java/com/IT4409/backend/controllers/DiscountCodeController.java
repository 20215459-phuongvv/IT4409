package com.IT4409.backend.controllers;

import com.IT4409.backend.entities.Discount;
import com.IT4409.backend.services.DiscountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Validated
@RequestMapping("/api/admin/")
public class DiscountCodeController {
    @Autowired
    private DiscountService discountService;

    @GetMapping("")
    public ResponseEntity<?> getAllDiscount() {
        try {
            List<Discount> discountList = discountService.getAllDiscount();
            return new ResponseEntity<>(discountList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
