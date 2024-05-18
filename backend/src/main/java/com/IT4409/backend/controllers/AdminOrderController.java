package com.IT4409.backend.controllers;

import com.IT4409.backend.dtos.OrderDTO.OrderResponseDTO;
import com.IT4409.backend.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/orders")
public class AdminOrderController {
    @Autowired
    private OrderService orderService;
    @GetMapping("")
    public ResponseEntity<?> getAllOrders(){
        try{
            List<OrderResponseDTO> orderList = orderService.getAllOrders();
            return new ResponseEntity<>(orderList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{orderId}/confirm")
    public ResponseEntity<?> confirmOrder(@PathVariable Long orderId){
        try{
            OrderResponseDTO order=orderService.confirmOrder(orderId);
            return new ResponseEntity<>(order,HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{orderId}/ship")
    public ResponseEntity<?> shipOrder(@PathVariable Long orderId){
        try{
            OrderResponseDTO order=orderService.shipOrder(orderId);
            return new ResponseEntity<>(order,HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{orderId}/deliver")
    public ResponseEntity<?> deliverOrder(@PathVariable Long orderId){
        try{
            OrderResponseDTO order=orderService.deliverOrder(orderId);
            return new ResponseEntity<>(order,HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

    }

    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<?> cancelOrder(@PathVariable Long orderId){
        try{
            OrderResponseDTO order=orderService.cancelOrder(orderId);
            return new ResponseEntity<>(order,HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{orderId}/delete")
    public ResponseEntity<?> deleteOrder(@PathVariable Long orderId){
        try{
            OrderResponseDTO order = orderService.deleteOrder(orderId);
            return new ResponseEntity<>(order,HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
