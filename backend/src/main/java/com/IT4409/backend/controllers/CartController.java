package com.IT4409.backend.controllers;

import com.IT4409.backend.dtos.CartItemDTO.CartItemRequestDTO;
import com.IT4409.backend.entities.Cart;
import com.IT4409.backend.entities.CartItem;
import com.IT4409.backend.entities.User;
import com.IT4409.backend.services.CartService;
import com.IT4409.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    private CartService cartService;
    @Autowired
    private UserService userService;
    @GetMapping("/")
    public ResponseEntity<?> findCartByUser(@RequestHeader("Authorization") String jwt) throws Exception {
        try{
            User user = userService.findUserByJwt(jwt);
            Cart cart = cartService.findCartByUserId(user.getUserId());
            return new ResponseEntity<>(cart, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping("/add")
    public ResponseEntity<?> addCartItem(@RequestBody CartItemRequestDTO cartItemRequestDTO,
                                         @RequestHeader("Authorization") String jwt) throws Exception {
        try {
            User user = userService.findUserByJwt(jwt);
            CartItem cartItem = cartService.addCartItem(user.getUserId(), cartItemRequestDTO);
            return new ResponseEntity<>(cartItem, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
