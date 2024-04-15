package com.IT4409.backend.services.interfaces;

import com.IT4409.backend.dtos.OrderDTO.OrderRequestDTO;
import com.IT4409.backend.entities.Order;
import com.IT4409.backend.exceptions.NotFoundException;

import java.util.List;

public interface IOrderService {
    List<Order> getAllOrders() throws NotFoundException;

    Order confirmOrder(Long orderId) throws NotFoundException;

    Order shipOrder(Long orderId) throws NotFoundException;

    Order deliverOrder(Long orderId) throws NotFoundException;

    Order cancelOrder(Long orderId) throws NotFoundException;

    Order deleteOrder(Long orderId) throws NotFoundException;

    Order createOrder(String jwt, OrderRequestDTO dto) throws Exception;

    List<Order> getOrderHistory(long userId);

    Order getOrderByOrderIdAndUserId(String jwt, Long orderId) throws Exception;
}
