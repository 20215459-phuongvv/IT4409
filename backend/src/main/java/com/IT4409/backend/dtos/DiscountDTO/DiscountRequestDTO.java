package com.IT4409.backend.dtos.DiscountDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DiscountRequestDTO {
    private String discountCode;
    private Integer discountValue;
    private Integer minCondition;
    private Integer maxPossibleValue;
    private Short status;
    private Date startDate;
    private Date endDate;
}
