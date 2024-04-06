package com.IT4409.backend.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "colors")
public class Color {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "color_id")
    private Long colorId;

    @Column(name = "product_id")
    private Long product_id;

    @Column(name = "color_name")
    private Long colorName;
}
