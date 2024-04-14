package com.IT4409.backend.controllers;

import com.IT4409.backend.entities.Order;
import com.IT4409.backend.entities.User;
import com.IT4409.backend.entities.UserDetail;
import com.IT4409.backend.services.OrderService;
import com.IT4409.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;
    @Autowired
    private UserService userService;

    @PostMapping("/")
    public ResponseEntity<?> createOrder(@RequestBody UserDetail userDetail,
                                         @RequestHeader("Authorization")String jwt){
        try{
            User user = userService.findUserByJwt(jwt);
            Order order = orderService.createOrder(user, userDetail);
            return new ResponseEntity<Order>(order, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/user")
    public ResponseEntity<?> usersOrderHistory(@RequestHeader("Authorization") String jwt){
        try{
            User user = userService.findUserByJwt(jwt);
            List<Order> orders = orderService.getOrderHistory(user.getUserId());
            return new ResponseEntity<>(orders, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<?> findOrder(@PathVariable Long orderId,
                                       @RequestHeader("Authorization") String jwt){
        try {
            User user = userService.findUserByJwt(jwt);
            Order orders = orderService.getOrderByOrderIdAndUserId(orderId);
            return new ResponseEntity<>(orders,HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
