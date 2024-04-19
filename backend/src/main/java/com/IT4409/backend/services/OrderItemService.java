package com.IT4409.backend.services;

import com.IT4409.backend.entities.OrderItem;
import com.IT4409.backend.services.interfaces.IOrderItemService;

public class OrderItemService implements IOrderItemService {
    @Override
    public OrderItem getOrderItem(Long orderId, Long orderItemId) {
        return null;
    }

    @Override
    public OrderItem updateOrderItem(Long orderId, Long orderItemId) {
        return null;
    }

    @Override
    public OrderItem deleteOrderItem(Long orderId, Long orderItemId) {
        return null;
    }

    @Override
    public OrderItem getOrderItemForUser(String jwt, Long orderId, Long orderItemId) {
        return null;
    }
}
