package com.IT4409.backend.repositories;

import com.IT4409.backend.entities.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserUserIdOrderByNotificationTimeDesc(long userId);
}
