package com.IT4409.backend.repositories;

import com.IT4409.backend.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findAllByOrderByCreatedAtDesc();
    @Query("SELECT o FROM Order o " +
            "WHERE o.user.userId = :userId " +
            "AND (o.orderStatus = 'PLACED' " +
            "OR o.orderStatus = 'CONFIRMED' " +
            "OR o.orderStatus = 'SHIPPED' " +
            "OR o.orderStatus = 'DELIVERED')")
    List<Order> getOrderHistory(long userId);
}
