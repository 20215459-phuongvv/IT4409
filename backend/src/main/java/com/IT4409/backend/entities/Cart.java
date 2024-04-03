package com.IT4409.backend.entities;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "Cart")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cartId")
    private int cartId;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;




}
