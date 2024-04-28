package com.IT4409.backend.services;

import com.IT4409.backend.Utils.Constants;
import com.IT4409.backend.dtos.DiscountDTO.DiscountRequestDTO;
import com.IT4409.backend.entities.Cart;
import com.IT4409.backend.entities.Discount;
import com.IT4409.backend.entities.User;
import com.IT4409.backend.exceptions.BadRequestException;
import com.IT4409.backend.exceptions.NotFoundException;
import com.IT4409.backend.repositories.CartRepository;
import com.IT4409.backend.repositories.DiscountRepository;
import com.IT4409.backend.services.interfaces.IDiscountService;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.Instant;
import java.util.Date;
import java.util.List;

import static com.IT4409.backend.Utils.Constants.messages;

public class DiscountService implements IDiscountService {
    @Autowired
    private UserService userService;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private DiscountRepository discountRepository;
    @Override
    public List<Discount> getAllDiscount() throws NotFoundException {
        List<Discount> discountList = discountRepository.findAll();
        if(discountList.isEmpty()) {
            throw new NotFoundException(messages.getString("discount.validate.not-found"));
        }
        return discountList;
    }

    @Override
    public Discount getById(Long discountId) throws NotFoundException {
        return discountRepository.findById(discountId)
                .orElseThrow(() -> new NotFoundException(messages.getString("discount.validate.not-found")));
    }

    @Override
    public Discount addDiscount(DiscountRequestDTO discountRequestDTO) throws BadRequestException {
        if(discountRequestDTO.getStartDate().after(discountRequestDTO.getEndDate())) {
            throw new BadRequestException(messages.getString("discount.validate.date-invalid"));
        }
        if(discountRequestDTO.getEndDate().before(Date.from(Instant.now()))) {
            throw new BadRequestException(messages.getString("discount.validate.end-date-invalid"));
        }
        Discount discount = Discount
                .builder()
                .discountCode(discountRequestDTO.getDiscountCode())
                .discountValue(discountRequestDTO.getDiscountValue())
                .minCondition(discountRequestDTO.getMinCondition())
                .maxPossibleValue(discountRequestDTO.getMaxPossibleValue())
                .startDate(discountRequestDTO.getStartDate())
                .status(Constants.DISCOUNT_STATUS.AVAILABLE)
                .endDate(discountRequestDTO.getEndDate())
                .build();
        return discountRepository.save(discount);
    }

    @Override
    public Discount updateDiscount(Long discountId, DiscountRequestDTO discountRequestDTO) throws BadRequestException, NotFoundException {
        Discount discount = discountRepository.findById(discountId)
                .orElseThrow(() -> new NotFoundException(messages.getString("discount.validate.not-found")));
        if(discountRequestDTO.getStartDate().after(discountRequestDTO.getEndDate())) {
            throw new BadRequestException(messages.getString("discount.validate.date-invalid"));
        }
        if(discountRequestDTO.getEndDate().before(Date.from(Instant.now()))) {
            throw new BadRequestException(messages.getString("discount.validate.end-date-invalid"));
        }
        discount.setDiscountCode(discountRequestDTO.getDiscountCode());
        discount.setDiscountValue(discountRequestDTO.getDiscountValue());
        discount.setStartDate(discountRequestDTO.getStartDate());
        discount.setEndDate(discountRequestDTO.getEndDate());
        discount.setMaxPossibleValue(discountRequestDTO.getMaxPossibleValue());
        discount.setMinCondition(discountRequestDTO.getMinCondition());
        discount.setStatus(discountRequestDTO.getStatus());
        return discountRepository.save(discount);
    }

    @Override
    public Discount deleteDiscount(Long discountId) throws NotFoundException {
        Discount discount = discountRepository.findById(discountId)
                .orElseThrow(() -> new NotFoundException(messages.getString("discount.validate.not-found")));
        discountRepository.deleteById(discountId);
        return discount;
    }

    @Override
    public Cart applyDiscount(String jwt, String discountCode) throws Exception {
        User user = userService.findUserByJwt(jwt);
        Cart cart = user.getCart();
        if(!discountRepository.existsByDiscountCodeAndStatus(discountCode, Constants.DISCOUNT_STATUS.AVAILABLE)) {
            throw new BadRequestException(messages.getString("discount.validate.not-found"));
        }
        cart.setDiscountCode(discountCode);
        return cartRepository.save(cart);
    }

    @Override
    public Cart deleteDiscountFromCart(String jwt) throws Exception {
        User user = userService.findUserByJwt(jwt);
        Cart cart = user.getCart();
        cart.setDiscountCode(null);
        return cartRepository.save(cart);
    }
}