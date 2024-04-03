package com.IT4409.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import jakarta.persistence.Table;

import java.util.List;

@Entity
@Table(name = "Category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "categoryId")
    private int categoryID;
    @Column(name = "categoryName", length = 255)
    private String categoryName;
    @Column(name = "thumbnail", length = 255)
    private String thumbnail;
    @OneToMany(mappedBy = "category")
    private List<Product> products;
}
