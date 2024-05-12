package com.IT4409.backend.controllers;

import com.IT4409.backend.dtos.OrderDTO.OrderRequestDTO;
import com.IT4409.backend.entities.Order;
import com.IT4409.backend.entities.User;
import com.IT4409.backend.services.OrderService;
import com.IT4409.backend.services.UserService;
import jakarta.transaction.Transactional;
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

    @PostMapping("")
    @Transactional
    public ResponseEntity<?> createOrder(@RequestBody OrderRequestDTO orderRequestDTO,
                                         @RequestHeader("Authorization")String jwt) throws Exception {
            Order order = orderService.createOrder(jwt, orderRequestDTO);
            return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @GetMapping("/qr/{orderId}")
    public ResponseEntity<?> getQrCode(@PathVariable Long orderId,
                                       @RequestHeader("Authorization") String jwt) throws Exception {
        Order order = orderService.getOrderByOrderIdAndUserId(jwt, orderId);
        String qrLink = order.getQrLink();
        return new ResponseEntity<>(qrLink, HttpStatus.ACCEPTED);
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
            Order order = orderService.getOrderByOrderIdAndUserId(jwt, orderId);
            return new ResponseEntity<>(order,HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
