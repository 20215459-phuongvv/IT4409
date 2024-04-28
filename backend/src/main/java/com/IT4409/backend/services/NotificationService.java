package com.IT4409.backend.services;

import com.IT4409.backend.dtos.NotificationDTO.NotificationResponseDTO;
import com.IT4409.backend.entities.Notification;
import com.IT4409.backend.entities.User;
import com.IT4409.backend.exceptions.NotFoundException;
import com.IT4409.backend.repositories.NotificationRepository;
import com.IT4409.backend.repositories.UserRepository;
import com.IT4409.backend.services.interfaces.INotificationService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static com.IT4409.backend.Utils.Constants.messages;

public class NotificationService implements INotificationService {
    @Autowired
    private UserService userService;
    @Autowired
    private NotificationRepository notificationRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Override
    public List<NotificationResponseDTO> getNotificationsByUserId(String jwt) throws Exception {
        User user = userService.findUserByJwt(jwt);
        List<Notification> notificationList = notificationRepository.findByUserUserIdOrderByNotificationTimeDesc(user.getUserId());
        if(notificationList.isEmpty()) {
            throw new NotFoundException(messages.getString("notification.validate.not-found"));
        }
        return notificationList
                .stream()
                .map(notification -> modelMapper.map(notification, NotificationResponseDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public Notification addNotification(Long userId, Long orderId, String text) throws NotFoundException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(messages.getString("user.validate.not-found")));
        Notification notification = Notification
                .builder()
                .user(user)
                .orderId(orderId)
                .text(text)
                .notificationTime(LocalDateTime.now())
                .build();
        return notificationRepository.save(notification);
    }

    @Override
    public Notification addDiscountNotification(Long userId, String text) throws NotFoundException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException(messages.getString("user.validate.not-found")));
        Notification notification = Notification
                .builder()
                .user(user)
                .text(text)
                .notificationTime(LocalDateTime.now())
                .build();
        return notificationRepository.save(notification);
    }

    @Override
    public Notification deleteNotification(String jwt, Long notificationId) throws Exception {
        User user = userService.findUserByJwt(jwt);
        Notification deletedNotification = notificationRepository.findByUserUserIdOrderByNotificationTimeDesc(user.getUserId())
                .stream()
                .filter(notification -> Objects.equals(notification.getNotificationId(), notificationId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException(messages.getString("notification.validate.not-found")));
       user.getNotificationList().remove(deletedNotification);
       userRepository.save(user);
        return deletedNotification;
    }

    @Override
    public List<Notification> deleteAllNotifications(String jwt) throws Exception {
        User user = userService.findUserByJwt(jwt);
        List<Notification> notificationList = notificationRepository.findByUserUserIdOrderByNotificationTimeDesc(user.getUserId());
        user.setNotificationList(null);
        userRepository.save(user);
        return notificationList;
    }
}
