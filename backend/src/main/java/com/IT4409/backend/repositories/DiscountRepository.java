package com.IT4409.backend.repositories;

import com.IT4409.backend.entities.Discount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiscountRepository extends JpaRepository<Discount, Long> {
}
