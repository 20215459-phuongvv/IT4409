package com.IT4409.backend.entities;
import jakarta.persistence.*;

import java.util.List;

public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cartItemId")
    private int cartItemId;

    @ManyToOne
    @JoinColumn(name = "cartId", nullable = false)
    private Cart cart;

    @ManyToOne
    @JoinColumn(name = "productId", nullable = false)
    private Product product;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "price")
    private int price;

    @Column(name = "discountPrice")
    private int discountPrice;
    @ManyToMany
    @JoinTable(name = "related_cart_items",
            joinColumns = @JoinColumn(name = "cart_item_id"),
            inverseJoinColumns = @JoinColumn(name = "related_cart_item_id"))
    private List<CartItem> relatedItems;
}
