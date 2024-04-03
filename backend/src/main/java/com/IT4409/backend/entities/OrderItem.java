package com.IT4409.backend.entities;
import jakarta.persistence.*;
@Entity
@Table(name = "OrderItem")
public class OrderItem {
    @EmbeddedId
    private OrderItemKey id;

    @ManyToOne
    @JoinColumn(name = "orderId", nullable = false, insertable = false, updatable = false)
    @MapsId(value = "orderItemId")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "productId", nullable = false, insertable = false, updatable = false)
    @MapsId(value = "productId")
    private Product product;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "price")
    private int price;

    @Column(name = "discountPrice")
    private int discountPrice;
}
