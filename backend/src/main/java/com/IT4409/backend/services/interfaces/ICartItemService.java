package com.IT4409.backend.services.interfaces;

import com.IT4409.backend.dtos.CartItemDTO.CartItemRequestDTO;
import com.IT4409.backend.entities.CartItem;

public interface ICartItemService {
    CartItem addCartItem(String jwt, CartItemRequestDTO cartItemRequestDTO) throws Exception;

    CartItem updateCartItem(String jwt, Long cartItemId, CartItemRequestDTO cartItemRequestDTO) throws Exception;

    CartItem removeCartItem(String jwt, Long cartItemId) throws Exception;

    CartItem getCartItemById(String jwt, Long cartItemId) throws Exception;
}
