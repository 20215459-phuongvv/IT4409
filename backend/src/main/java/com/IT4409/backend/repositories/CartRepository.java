package com.IT4409.backend.repositories;

import com.IT4409.backend.entities.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {
}
