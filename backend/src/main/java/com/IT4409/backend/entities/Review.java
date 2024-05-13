package com.IT4409.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "reviews")
@Data
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private Long reviewId;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "ratingValue")
    private Short ratingValue;

    @Column(name = "comment")
    private String comment;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "order_item_id")
    @JsonIgnoreProperties("orderItem")
    private OrderItem orderItem;

//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "user_id")
//    @JsonIgnoreProperties("reviewList")
//    private User user;

    @OneToMany(mappedBy = "review", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("review")
    private List<ReviewImage> reviewImageList;
}
