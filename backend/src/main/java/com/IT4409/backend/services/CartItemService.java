package com.IT4409.backend.services;

import com.IT4409.backend.Utils.Constants;
import com.IT4409.backend.dtos.CartItemDTO.CartItemRequestDTO;
import com.IT4409.backend.entities.Cart;
import com.IT4409.backend.entities.CartItem;
import com.IT4409.backend.entities.Product;
import com.IT4409.backend.entities.User;
import com.IT4409.backend.exceptions.BadRequestException;
import com.IT4409.backend.exceptions.NotFoundException;
import com.IT4409.backend.repositories.CartItemRepository;
import com.IT4409.backend.repositories.CartRepository;
import com.IT4409.backend.repositories.ProductRepository;
import com.IT4409.backend.services.interfaces.ICartItemService;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.Objects;

import static com.IT4409.backend.Utils.Constants.messages;

public class CartItemService implements ICartItemService {
    @Autowired
    private UserService userService;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CartItemRepository cartItemRepository;
    @Override
    public CartItem getCartItemById(String jwt, Long cartItemId) throws Exception {
        User user = userService.findUserByJwt(jwt);
        Cart cart = cartRepository.findByUserUserId(user.getUserId())
                .orElseThrow(() -> new NotFoundException(messages.getString("user.validate.not-found")));
        return cart.getCartItemList().stream()
                .filter(item -> Objects.equals(item.getCartItemId(), cartItemId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException(messages.getString("cart-item.validate.not-found")));
    }
    @Override
    public CartItem addCartItem(String jwt, CartItemRequestDTO cartItemRequestDTO) throws Exception {
        User user = userService.findUserByJwt(jwt);
        Cart cart = cartRepository.findByUserUserId(user.getUserId())
                .orElseThrow(() -> new NotFoundException(messages.getString("user.validate.not-found")));
        Product product = productRepository.findById(cartItemRequestDTO.getProductId())
                .orElseThrow(() -> new NotFoundException(messages.getString("product.validate.not-found")));
        if(product.getStatus() == Constants.PRODUCT_STATUS.OUT_OF_STOCK) {
            throw new BadRequestException(messages.getString("product.validate.out-of-stock"));
        }
        for (CartItem cartItem : cart.getCartItemList()) {
            if (cartItem.getProduct().getProductId().equals(cartItemRequestDTO.getProductId())
                    && cartItem.getColor().equals(cartItemRequestDTO.getColor())
                    && cartItem.getSize().equals(cartItemRequestDTO.getSize())) {
                int newQuantity = cartItem.getQuantity() + cartItemRequestDTO.getQuantity();
                Long totalPrice = product.getPrice() * newQuantity;
                cartItem.setQuantity(newQuantity);
                cartItem.setPrice(totalPrice);
                cartItem.setCreateAt(LocalDateTime.now());

                cartRepository.save(cart);
                return cartItem;
            }
        }

        CartItem newCartItem = CartItem
                .builder()
                .product(product)
                .color(cartItemRequestDTO.getColor())
                .size(cartItemRequestDTO.getSize())
                .quantity((cartItemRequestDTO.getQuantity() != null) ? cartItemRequestDTO.getQuantity() : 1)
                .price(product.getPrice())
                .discountPrice(product.getDiscountPrice())
                .cart(cart)
                .build();
        return cartItemRepository.save(newCartItem);
    }

    @Override
    public CartItem updateCartItem(String jwt, Long cartItemId, CartItemRequestDTO cartItemRequestDTO) throws Exception {
        User user = userService.findUserByJwt(jwt);
        Cart cart = cartRepository.findByUserUserId(user.getUserId())
                .orElseThrow(() -> new NotFoundException(messages.getString("user.validate.not-found")));
        CartItem cartItem = cart.getCartItemList().stream()
                .filter(item -> Objects.equals(item.getCartItemId(), cartItemId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException(messages.getString("cart-item.validate.not-found")));
        cartItem.setSize(cartItemRequestDTO.getSize());
        cartItem.setColor(cartItem.getColor());
        cartItem.setQuantity(cartItem.getQuantity());
        return cartItemRepository.save(cartItem);
    }

    @Override
    public CartItem removeCartItem(String jwt, Long cartItemId) throws Exception {
        User user = userService.findUserByJwt(jwt);
        Cart cart = cartRepository.findByUserUserId(user.getUserId())
                .orElseThrow(() -> new NotFoundException(messages.getString("user.validate.not-found")));
        CartItem cartItem = cart.getCartItemList().stream()
                .filter(item -> Objects.equals(item.getCartItemId(), cartItemId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException(messages.getString("cart-item.validate.not-found")));
        Product product = cartItem.getProduct();
        cartItemRepository.deleteById(cartItemId);
        return cartItem;
    }
}
