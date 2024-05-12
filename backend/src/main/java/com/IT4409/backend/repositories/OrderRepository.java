package com.IT4409.backend.repositories;

import com.IT4409.backend.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findAllByOrderByCreatedAtDesc();
//    List<Order> findAllByUserUserId(long userId);
    List<Order> findAllByUserIdOrderByCreatedAtDesc(long userId);
}
