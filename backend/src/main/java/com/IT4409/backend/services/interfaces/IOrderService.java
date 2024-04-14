package com.IT4409.backend.services.interfaces;

import com.IT4409.backend.entities.Order;
import com.IT4409.backend.entities.User;
import com.IT4409.backend.entities.UserDetail;
import com.IT4409.backend.exceptions.NotFoundException;

import java.util.List;

public interface IOrderService {
    List<Order> getAllOrders() throws NotFoundException;

    Order confirmOrder(Long orderId) throws NotFoundException;

    Order shipOrder(Long orderId) throws NotFoundException;

    Order deliverOrder(Long orderId) throws NotFoundException;

    Order cancelOrder(Long orderId) throws NotFoundException;

    Order deleteOrder(Long orderId) throws NotFoundException;

    Order createOrder(User user, UserDetail userDetail);

    List<Order> getOrderHistory(long userId);

    Order getOrderByOrderIdAndUserId(Long orderId);
}
