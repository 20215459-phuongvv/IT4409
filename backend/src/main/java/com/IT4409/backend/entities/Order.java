package com.IT4409.backend.entities;
import jakarta.persistence.*;

import java.sql.Date;
import java.util.List;

@Entity
@Table(name = "Orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orderId")
    private int orderId;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @Column(name = "orderDate")
    @Temporal(TemporalType.DATE)
    private Date orderDate;

    @Column(name = "orderStatus", nullable = false, length = 255)
    private String orderStatus;

    @Column(name = "paymentMethod", nullable = false, length = 255)
    private String paymentMethod;

    @Column(name = "noteOrder", columnDefinition = "text")
    private String noteOrder;

    @Column(name = "discountCodeId", length = 20)
    private String discountCodeId;

    @Column(name = "totalAmount")
    private int totalAmount;

    @OneToMany(mappedBy = "order")
    private List<OrderItem> orderItems;
}
