package com.IT4409.backend.entities;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "discounts")
@Data
@Builder
public class Discount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "discount_code_id")
    private Long discountCodeId;

    @Column(name = "discount_code")
    private String discountCode;

    @Column(name = "discount_value")
    private Integer discountValue;

    @Column(name = "min_condition")
    private Integer minCondition;

    @Column(name = "max_possible_value")
    private Integer maxPossibleValue;

    @Column(name = "status")
    private Short status;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;
}
