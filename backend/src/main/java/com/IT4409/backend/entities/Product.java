package com.IT4409.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import jakarta.persistence.Table;

import java.util.List;

@Entity
@Table(name = "Products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "productId")
    private int productId;
    @Column(name = "productName", length = 255)
    private String productName;
    @Column(name = "status", length = 50)
    private String status;
    @Column(name = "description", columnDefinition = "text")
    private String description;
    @Column(name = "rating")
    private double rating;
    @Column(name = "price")
    private int price;
    @Column(name = "discountPrice")
    private int discountPrice;



}
