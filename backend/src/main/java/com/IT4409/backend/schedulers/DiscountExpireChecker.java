package com.IT4409.backend.schedulers;

import com.IT4409.backend.Utils.Constants;
import com.IT4409.backend.entities.Cart;
import com.IT4409.backend.entities.Discount;
import com.IT4409.backend.exceptions.NotFoundException;
import com.IT4409.backend.repositories.CartRepository;
import com.IT4409.backend.repositories.DiscountRepository;
import com.IT4409.backend.services.DiscountService;
import com.IT4409.backend.services.NotificationService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class DiscountExpireChecker {
    @Autowired
    private DiscountService discountService;
    @Autowired
    private DiscountRepository discountRepository;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private NotificationService notificationService;
    @Transactional
    @Scheduled(cron = "0 0 0 * * *")
    public void checkVoucherExpiry() throws NotFoundException {
        LocalDate today = LocalDate.now();
        List<Discount> expiredDiscount = discountRepository.findByEndDateBeforeOrEndDate(today, today);
        for (Discount discount : expiredDiscount) {
            discount.setStatus(Constants.DISCOUNT_STATUS.OUT_OF_DATE);
            List<Cart> cartList = cartRepository.findByDiscountCode(discount.getDiscountCode());
            for (Cart cart : cartList) {
                cart.setDiscountCode(null);
                cartRepository.save(cart);
                notificationService.addDiscountNotification(cart.getUser().getUserId(), "Discount " + discount.getDiscountCode() + "is expired!");
            }
            discountRepository.save(discount);
        }
    }
}
