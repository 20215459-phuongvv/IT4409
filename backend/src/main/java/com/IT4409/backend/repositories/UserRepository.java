package com.IT4409.backend.repositories;

import com.IT4409.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    List<User> findAllByOrderByCreatedAtDesc();

    boolean existsByEmail(String email);
}
