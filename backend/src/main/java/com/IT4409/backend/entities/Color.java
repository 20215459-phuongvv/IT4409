package com.IT4409.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import jakarta.persistence.Table;

import java.util.List;

@Entity
@Table(name = "Color")
public class Color {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int colorId;
    @Column(name = "colorName", length = 20)
    private String colorName;
    @OneToMany(mappedBy = "color")
    private List<Product> products;
}
