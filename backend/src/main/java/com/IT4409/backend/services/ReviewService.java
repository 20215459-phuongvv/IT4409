package com.IT4409.backend.services;

import com.IT4409.backend.Utils.OrderStatus;
import com.IT4409.backend.dtos.ReviewDTO.ReviewRequestDTO;
import com.IT4409.backend.entities.*;
import com.IT4409.backend.exceptions.BadRequestException;
import com.IT4409.backend.exceptions.NotFoundException;
import com.IT4409.backend.repositories.*;
import com.IT4409.backend.services.interfaces.IReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static com.IT4409.backend.Utils.Constants.messages;

public class ReviewService implements IReviewService {
    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ReviewImageRepository reviewImageRepository;
    @Autowired
    private CloudinaryService cloudinaryService;
    @Override
    public List<Review> getProductReviews(Long productId) throws Exception {
        List<Review> reviewList = new ArrayList<>();
        List<OrderItem> orderItemList = orderItemRepository.findByProductProductId(productId)
                .orElseThrow(() -> new NotFoundException(messages.getString("product.validate.not-found")));
        for(OrderItem orderItem : orderItemList) {
            if(orderItem.getReview() != null){
                reviewList.add(orderItem.getReview());
            }
        }
        if(reviewList.isEmpty()) {
            throw new NotFoundException(messages.getString("review.validate.not-found"));
        }
        return reviewList;
    }

    @Override
    public Review getReviewById(Long reviewId) throws Exception {
        return reviewRepository.findById(reviewId)
                .orElseThrow(() -> new NotFoundException(messages.getString("review.validate.not-found")));
    }

    @Override
    public Review addReview(String jwt, Long orderId, Long orderItemId, ReviewRequestDTO reviewRequestDTO) throws Exception {
        User user = userService.findUserByJwt(jwt);
        Order order = user.getOrderList()
                .stream()
                .filter(order1 -> Objects.equals(order1.getOrderId(), orderId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException(messages.getString("order.validate.not-found")));
        if(!order.getOrderStatus().equals(OrderStatus.DELIVERED.toString())) {
            throw new BadRequestException(messages.getString("order.validate.can-not-review"));
        }
        OrderItem orderItem = order.getOrderItemList()
                .stream()
                .filter(item -> Objects.equals(item.getOrderItemId(), orderItemId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException(messages.getString("order-item.validate.not-found")));
        if(orderItem.getReview() != null) {
            throw new BadRequestException(messages.getString("review.validate.already-exist"));
        }

        Review review = new Review();
        review.setUser(user);
        review.setOrderItem(orderItem);
        review.setRatingValue(reviewRequestDTO.getRatingValue());
        review.setComment(reviewRequestDTO.getComment());
        review = reviewRepository.save(review);
        if(!reviewRequestDTO.getImages().isEmpty()) {
            for(MultipartFile image : reviewRequestDTO.getImages()) {
                ReviewImage reviewImage = new ReviewImage();
                String url = cloudinaryService.upload(image.getBytes(), image.getOriginalFilename(), "review_images");
                reviewImage.setImageUrl(url);
                reviewImage.setReview(review);
                reviewImageRepository.save(reviewImage);
            }
        }
        // Xem xét thay đổi rating sản phẩm sau
        //
        //
        //
        return reviewRepository.save(review);
    }

    @Override
    public Review editReview(String jwt, Long reviewId, ReviewRequestDTO reviewRequestDTO) throws Exception {
        User user = userService.findUserByJwt(jwt);
        Review review = user.getReviewList()
                .stream()
                .filter(review1 -> Objects.equals(review1.getReviewId(), reviewId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException(messages.getString("review.validate.not-found")));
        review.setRatingValue(reviewRequestDTO.getRatingValue());
        review.setComment(reviewRequestDTO.getComment());
        review = reviewRepository.save(review);
        if(!reviewRequestDTO.getImages().isEmpty()) {
            for(MultipartFile image : reviewRequestDTO.getImages()) {
                ReviewImage reviewImage = new ReviewImage();
                String url = cloudinaryService.upload(image.getBytes(), image.getOriginalFilename(), "review_images");
                reviewImage.setImageUrl(url);
                reviewImage.setReview(review);
                reviewImageRepository.save(reviewImage);
            }
        }
        // Xem xét thay đổi rating sản phẩm sau
        //
        //
        //
        return reviewRepository.save(review);
    }

    @Override
    public Review deleteReview(String jwt, Long reviewId) throws Exception {
        User user = userService.findUserByJwt(jwt);
        Review review = user.getReviewList()
                .stream()
                .filter(review1 -> Objects.equals(review1.getReviewId(), reviewId))
                .findFirst()
                .orElseThrow(() -> new NotFoundException(messages.getString("review.validate.not-found")));
        user.getReviewList().remove(review);
        userRepository.save(user);
        // Xem xét thay đổi rating sản phẩm sau
        //.avarage()
        //
        //
        return review;
    }
}
