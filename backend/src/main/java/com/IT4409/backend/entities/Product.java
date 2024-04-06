package com.IT4409.backend.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "products")
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long productId;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "status")
    private Short status;

    @Column(name = "description")
    private String description;

    @Column(name = "rating")
    private Double rating;

    @Column(name = "price")
    private Long price;

    @Column(name = "discount_price")
    private Long discountPrice;

    @Column(name = "quantity_in_stock")
    private int quantityInStock;

    @Column(name = "thumbnail")
    private String thumbnail;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "product_id")
    private List<Color> colorList;

    @JoinColumn(name = "product_id")
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Size> sizeList;
}
