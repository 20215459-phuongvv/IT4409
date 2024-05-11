package com.IT4409.backend.controllers;

import com.IT4409.backend.dtos.ProductDTO.ProductRequestDTO;
import com.IT4409.backend.entities.Product;
import com.IT4409.backend.services.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@Validated
public class ProductController {
    @Autowired
    private ProductService productService;
    @GetMapping("/products")
    public ResponseEntity<?> getAllProducts(){
        try{
            List<Product> productList = productService.getAllProducts();
            return new ResponseEntity<>(productList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/products/{productId}")
    public ResponseEntity<?> getProductById(@PathVariable Long productId) {
        try{
            Product product = productService.getProductById(productId);
            return new ResponseEntity<>(product, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("products/search")
    public ResponseEntity<?> searchProduct(@RequestParam String productName) {
        try{
            List<Product> productList = productService.searchProduct(productName);
            return new ResponseEntity<>(productList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    @RequestMapping(path = "/admin/products", method = POST, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> createProduct(@ModelAttribute @Valid ProductRequestDTO productRequestDTO){
        try{
            Product product = productService.createProduct(productRequestDTO);
            return new ResponseEntity<>(product, HttpStatus.CREATED);
        } catch(Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @PutMapping("/admin/products/{productId}")
    public ResponseEntity<?> updateProduct(@PathVariable Long productId, @RequestBody ProductRequestDTO productRequestDTO){
        try{
            Product product = productService.updateProduct(productId, productRequestDTO);
            return new ResponseEntity<>(product, HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @DeleteMapping("/admin/products/{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long productId){
        try{
            Product product = productService.deleteProduct(productId);
            return new ResponseEntity<>(product, HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
