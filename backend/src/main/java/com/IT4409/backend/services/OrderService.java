package com.IT4409.backend.services;

import com.IT4409.backend.Utils.Constants;
import com.IT4409.backend.Utils.OrderStatus;
import com.IT4409.backend.Utils.PaymentStatus;
import com.IT4409.backend.dtos.OrderDTO.OrderRequestDTO;
import com.IT4409.backend.entities.*;
import com.IT4409.backend.exceptions.BadRequestException;
import com.IT4409.backend.exceptions.NotFoundException;
import com.IT4409.backend.repositories.*;
import com.IT4409.backend.services.interfaces.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static com.IT4409.backend.Utils.Constants.messages;

public class OrderService implements IOrderService {
    @Autowired
    private UserService userService;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private CartItemRepository cartItemRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private DiscountRepository discountRepository;
    @Override
    public List<Order> getAllOrders() throws NotFoundException {
        List<Order> orderList = orderRepository.findAllByOrderByCreatedAtDesc();
        if(orderList.isEmpty()) {
            throw new NotFoundException(messages.getString("order.validate.not-found"));
        }
        return orderList;
    }

    @Override
    public Order confirmOrder(Long orderId) throws NotFoundException {
        Order order = orderRepository.findById(orderId).
                orElseThrow(() -> new NotFoundException(messages.getString("order.validate.not-found")));
        order.setOrderStatus(OrderStatus.CONFIRMED.toString());
        return orderRepository.save(order);
    }

    @Override
    public Order shipOrder(Long orderId) throws NotFoundException {
        Order order = orderRepository.findById(orderId).
                orElseThrow(() -> new NotFoundException(messages.getString("order.validate.not-found")));
        order.setOrderStatus(OrderStatus.SHIPPED.toString());
        return orderRepository.save(order);
    }

    @Override
    public Order deliverOrder(Long orderId) throws NotFoundException {
        Order order = orderRepository.findById(orderId).
                orElseThrow(() -> new NotFoundException(messages.getString("order.validate.not-found")));
        order.setOrderStatus(OrderStatus.DELIVERED.toString());
        return orderRepository.save(order);
    }

    @Override
    public Order cancelOrder(Long orderId) throws NotFoundException {
        Order order = orderRepository.findById(orderId).
                orElseThrow(() -> new NotFoundException(messages.getString("order.validate.not-found")));
        for(OrderItem orderItem : order.getOrderItemList()) {
            Product product = orderItem.getProduct();
            product.setQuantityInStock(product.getQuantityInStock() + orderItem.getQuantity());
            productRepository.save(product);
        }
        order.setOrderStatus(OrderStatus.CANCELLED.toString());
        return orderRepository.save(order);
    }

    @Override
    public Order deleteOrder(Long orderId) throws NotFoundException {
        Order order = orderRepository.findById(orderId).
                orElseThrow(() -> new NotFoundException(messages.getString("order.validate.not-found")));
        orderRepository.deleteById(orderId);
        return order;
    }

    @Override
    public Order createOrder(String jwt, OrderRequestDTO orderRequestDTO) throws Exception {
        Long totalAmount = 0L;
        Long discountedAmount = 0L;
        User user = userService.findUserByJwt(jwt);
        Cart cart = user.getCart();
        List<OrderItem> orderItemList = new ArrayList<>();

        for(CartItem cartItem : cart.getCartItemList()) {
            if(cartItem.getProduct().getStatus() == Constants.PRODUCT_STATUS.OUT_OF_STOCK) {
                throw new BadRequestException(messages.getString("product.validate.out-of-stock"));
            }

            // Kiểm tra số lượng hàng hóa
            Product product = cartItem.getProduct();
            if(product.getQuantityInStock() < cartItem.getQuantity()){
                throw new BadRequestException(messages.getString("product.validate.insufficient"));
            } else {
                product.setQuantityInStock(product.getQuantityInStock() - cartItem.getQuantity());
                productRepository.save(product);
            }

            // Tạo item trong đơn hàng
            OrderItem orderItem = new OrderItem();
            orderItem.setPrice(cartItem.getPrice());
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setSize(cartItem.getSize());
            orderItem.setColor(cartItem.getColor());
            orderItem.setDiscountPrice(cartItem.getDiscountPrice());

            // Tính tổng tiền
            totalAmount += orderItem.getDiscountPrice() * cartItem.getQuantity();
            // Tính số tiền đã giảm từ hàng hóa
            discountedAmount = discountedAmount + (product.getPrice() - product.getDiscountPrice()) * cartItem.getQuantity();

            // Lưu item
            orderItem = orderItemRepository.save(orderItem);
            orderItemList.add(orderItem);

            // Xóa đồ trong giỏ hàng
            cart.getCartItemList().remove(cartItem);
            cartRepository.save(cart);
        }

        Order order = orderRepository.save(new Order());
        if (orderRequestDTO.getUserDetail() != null && orderRequestDTO.getUserDetailRequestDTO() == null) {
            order.setUserDetail(orderRequestDTO.getUserDetail());
        } else if (orderRequestDTO.getUserDetail() == null && orderRequestDTO.getUserDetailRequestDTO() != null){
            UserDetail newUserDetail = UserDetail
                    .builder()
                    .address(orderRequestDTO.getUserDetailRequestDTO().getAddress())
                    .name(orderRequestDTO.getUserDetailRequestDTO().getName())
                    .phoneNumber(orderRequestDTO.getUserDetailRequestDTO().getPhoneNumber())
                    .build();
            user.getUserDetailList().add(newUserDetail);
            userRepository.save(user);
            order.setUserDetail(newUserDetail);
        } else {
            throw new BadRequestException(messages.getString("user-detail.validate.more-than-one"));
        }

        if(order.getUserDetail().getAddress().toLowerCase().contains("hà nội")){
            totalAmount += Constants.SHIPPING_FEE.INSIDE_HANOI;
        } else {
            totalAmount += Constants.SHIPPING_FEE.OUTSIDE_HANOI;
        }

        order.setCreatedAt(LocalDateTime.now());
        order.setUser(user);
        order.setOrderItemList(orderItemList);
        order.setTotalAmount(totalAmount);
        order.setDiscountedAmount(discountedAmount);
        // Áp dụng voucher
        if(cart.getDiscountCode() != null && isDiscountValid(order, cart.getDiscountCode())) {
            Discount discount = discountRepository.findByDiscountCodeAndStatus(cart.getDiscountCode(), Constants.DISCOUNT_STATUS.AVAILABLE).get();
            order.setDiscountFromVoucher(Math.min(order.getTotalAmount() * discount.getDiscountValue(), discount.getMaxPossibleValue()));
            order.setFinalPrice(order.getTotalAmount() - order.getDiscountFromVoucher());
        }
        order.setPaymentMethod(orderRequestDTO.getPaymentMethod());
        order.setOrderStatus(OrderStatus.PENDING.toString());
        order.setPaymentStatus(PaymentStatus.PENDING.toString());

        return orderRepository.save(order);
    }

    @Override
    public List<Order> getOrderHistory(long userId) {
        return orderRepository.findAllByUserUserIdOrderByCreatedAtDesc(userId);
    }

    @Override
    public Order getOrderByOrderIdAndUserId(String jwt, Long orderId) throws Exception {
        User user = userService.findUserByJwt(jwt);
        return user.getOrderList()
                .stream()
                .filter(order -> Objects.equals(order.getOrderId(), orderId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException(messages.getString("order.validate.not-found")));
    }

    private boolean isDiscountValid(Order order, String discountCode) throws BadRequestException {
        Optional<Discount> discountOptional = discountRepository.findByDiscountCodeAndStatus(discountCode, Constants.DISCOUNT_STATUS.AVAILABLE);
        if(discountOptional.isEmpty()){
            return false;
        }
        Discount discount = discountOptional.get();
        if(discount.getMinCondition() > order.getTotalAmount()) {
            return false;
        }
        return true;
    }
}
