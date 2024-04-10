package com.IT4409.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "carts")
@Data
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_id")
    private Long cartId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties("cart")
    private User user;

    @OneToMany(mappedBy = "cart")
    @JsonIgnoreProperties("cart")
    private Set<CartItem> cartItemList;

    @Column(name = "total_price")
    private Long totalPrice;

    @Column(name = "total_item")
    private Integer totalItem;

    private Long totalDiscountPrice;

    private Long discountedAmount;
}
