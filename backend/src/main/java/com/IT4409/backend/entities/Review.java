package com.IT4409.backend.entities;
import jakarta.persistence.*;
@Entity
@Table(name = "Review")

public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reviewId")
    private int reviewId;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "orderItemId", nullable = false)
    private OrderItem orderItem;

    @Column(name = "ratingValue")
    private int ratingValue;

    @Column(name = "comment", length = 255)
    private String comment;
}
