package com.IT4409.backend.services;

import com.IT4409.backend.dtos.CartItemDTO.CartItemRequestDTO;
import com.IT4409.backend.entities.Cart;
import com.IT4409.backend.entities.CartItem;
import com.IT4409.backend.entities.Product;
import com.IT4409.backend.entities.User;
import com.IT4409.backend.exceptions.NotFoundException;
import com.IT4409.backend.repositories.CartRepository;
import com.IT4409.backend.services.interfaces.ICartService;
import org.springframework.beans.factory.annotation.Autowired;

public class CartService implements ICartService {
    @Autowired
    private CartRepository cartRepository;
    @Override
    public Cart createCart(User user) {
        Cart cart = new Cart();
        cart.setUser(user);
        return cartRepository.save(cart);
    }

    @Override
    public Cart findCartByUserId(long userId) throws NotFoundException {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new NotFoundException("User not found!"));
        long totalPrice = 0;
        long totalDiscountPrice = 0;
        int totalItem = 0;
        for(CartItem cartItem : cart.getCartItemList()) {
            totalPrice += cartItem.getPrice();
            totalDiscountPrice += cartItem.getDiscountPrice();
            totalItem += cartItem.getQuantity();
        }

        cart.setTotalPrice(totalPrice);
        cart.setTotalItem(totalItem);
        cart.setTotalDiscountPrice(totalDiscountPrice);
        cart.setDiscountedAmount(totalPrice - totalDiscountPrice);

        return cartRepository.save(cart);
    }

    @Override
    public CartItem addCartItem(long userId, CartItemRequestDTO cartItemRequestDTO) throws NotFoundException {
        return null;
    }
}
