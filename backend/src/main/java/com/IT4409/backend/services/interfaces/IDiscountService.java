package com.IT4409.backend.services.interfaces;

import com.IT4409.backend.dtos.DiscountDTO.DiscountRequestDTO;
import com.IT4409.backend.entities.Discount;
import com.IT4409.backend.exceptions.BadRequestException;
import com.IT4409.backend.exceptions.NotFoundException;

import java.util.List;

public interface IDiscountService {
    List<Discount> getAllDiscount() throws NotFoundException;

    Discount getById(Long discountId) throws NotFoundException;

    Discount addDiscount(DiscountRequestDTO discountRequestDTO) throws BadRequestException;

    Discount updateDiscount(Long discountId, DiscountRequestDTO discountRequestDTO) throws BadRequestException, NotFoundException;

    Discount deleteDiscount(Long discountId) throws NotFoundException;
}
