package com.IT4409.backend.services;

import com.IT4409.backend.Utils.OrderStatus;
import com.IT4409.backend.entities.Order;
import com.IT4409.backend.entities.User;
import com.IT4409.backend.entities.UserDetail;
import com.IT4409.backend.exceptions.NotFoundException;
import com.IT4409.backend.repositories.OrderRepository;
import com.IT4409.backend.services.interfaces.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static com.IT4409.backend.Utils.Constants.messages;

public class OrderService implements IOrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Override
    public List<Order> getAllOrders() throws NotFoundException {
        List<Order> orderList = orderRepository.findAllByOrderByCreatedAtDesc();
        if(orderList.isEmpty()) {
            throw new NotFoundException(messages.getString("order.validate.not-found"));
        }
        return orderList;
    }

    @Override
    public Order confirmOrder(Long orderId) throws NotFoundException {
        Order order = orderRepository.findById(orderId).
                orElseThrow(() -> new NotFoundException(messages.getString("order.validate.not-found")));
        order.setOrderStatus(OrderStatus.CONFIRMED.toString());
        return orderRepository.save(order);
    }

    @Override
    public Order shipOrder(Long orderId) throws NotFoundException {
        Order order = orderRepository.findById(orderId).
                orElseThrow(() -> new NotFoundException(messages.getString("order.validate.not-found")));
        order.setOrderStatus(OrderStatus.SHIPPED.toString());
        return orderRepository.save(order);
    }

    @Override
    public Order deliverOrder(Long orderId) throws NotFoundException {
        Order order = orderRepository.findById(orderId).
                orElseThrow(() -> new NotFoundException(messages.getString("order.validate.not-found")));
        order.setOrderStatus(OrderStatus.DELIVERED.toString());
        return orderRepository.save(order);
    }

    @Override
    public Order cancelOrder(Long orderId) throws NotFoundException {
        Order order = orderRepository.findById(orderId).
                orElseThrow(() -> new NotFoundException(messages.getString("order.validate.not-found")));
        order.setOrderStatus(OrderStatus.CANCELLED.toString());
        return orderRepository.save(order);
    }

    @Override
    public Order deleteOrder(Long orderId) throws NotFoundException {
        Order order = orderRepository.findById(orderId).
                orElseThrow(() -> new NotFoundException(messages.getString("order.validate.not-found")));
        orderRepository.deleteById(orderId);
        return order;
    }

    @Override
    public Order createOrder(User user, UserDetail userDetail) {
        return null;
    }

    @Override
    public List<Order> getOrderHistory(long userId) {
        return null;
    }

    @Override
    public Order getOrderByOrderIdAndUserId(Long orderId) {
        return null;
    }
}
