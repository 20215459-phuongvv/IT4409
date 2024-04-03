package com.IT4409.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.*;

import java.sql.Date;
import java.util.List;

@Entity
@Table(name = "DiscountCode")
public class DiscountCode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "discountCodeId")
    private int discountCodeId;

    @Column(name = "discountCode", nullable = false, length = 20)
    private String discountCode;

    @Column(name = "discountValue")
    private int discountValue;

    @Column(name = "condition", columnDefinition = "text")
    private String condition;

    @Column(name = "startDate")
    @Temporal(TemporalType.DATE)
    private Date startDate;

    @Column(name = "endDate")
    @Temporal(TemporalType.DATE)
    private Date endDate;

    @OneToMany(mappedBy = "discountCode")
    private List<Order> orders;
}
