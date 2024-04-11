package com.IT4409.backend.services.interfaces;

import com.IT4409.backend.dtos.CartItemDTO.CartItemRequestDTO;
import com.IT4409.backend.entities.Cart;
import com.IT4409.backend.entities.CartItem;
import com.IT4409.backend.entities.User;
import com.IT4409.backend.exceptions.NotFoundException;

public interface ICartService {
    Cart createCart(User user);
    Cart findCartByUserId(long userId) throws NotFoundException;
}
