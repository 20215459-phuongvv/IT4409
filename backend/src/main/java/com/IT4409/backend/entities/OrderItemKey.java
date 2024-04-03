package com.IT4409.backend.entities;

import jakarta.persistence.*;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class OrderItemKey implements Serializable {
    @Column(name = "orderItemId", nullable = false)
    private int orderItemId;

    @Column(name = "productId", nullable = false)
    private int productId;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderItemKey that = (OrderItemKey) o;
        return orderItemId == that.orderItemId && productId == that.productId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(orderItemId, productId);
    }
}
