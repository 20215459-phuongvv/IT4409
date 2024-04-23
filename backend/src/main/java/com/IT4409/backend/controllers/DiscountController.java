package com.IT4409.backend.controllers;

import com.IT4409.backend.dtos.DiscountDTO.DiscountRequestDTO;
import com.IT4409.backend.entities.Discount;
import com.IT4409.backend.services.DiscountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Validated
@RequestMapping("/api/admin/discounts")
public class DiscountController {
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

    @GetMapping("/{discountId}")
    public ResponseEntity<?> getDiscountById(@PathVariable("discountId") Long discountId) {
        try {
            Discount discount = discountService.getById(discountId);
            return new ResponseEntity<>(discount, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("")
    public ResponseEntity<?> addDiscount(@RequestBody DiscountRequestDTO discountRequestDTO) {
        try {
            Discount discount = discountService.addDiscount(discountRequestDTO);
            return new ResponseEntity<>(discount, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{discountId}")
    public ResponseEntity<?> updateDiscount(@PathVariable("discountId") Long discountId,
                                            @RequestBody DiscountRequestDTO discountRequestDTO) {
        try {
            Discount discount = discountService.updateDiscount(discountId, discountRequestDTO);
            return new ResponseEntity<>(discount, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{discountId}")
    public ResponseEntity<?> deleteDiscount(@PathVariable("discountId") Long discountId) {
        try {
            Discount discount = discountService.deleteDiscount(discountId);
            return new ResponseEntity<>(discount, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

}
