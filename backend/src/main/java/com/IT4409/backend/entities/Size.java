package com.IT4409.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import jakarta.persistence.Table;

import java.util.List;

@Entity
@Table(name = "Size")
public class Size {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sizeId")
    private int sizeId;
    @Column(name = "sizeName", length = 5)
    private String sizeName;
    @OneToMany(mappedBy = "size")
    private List<Product> products;
}
