package com.estore.estore_backend.review.service;

import com.estore.estore_backend.review.entity.Review;
import com.estore.estore_backend.review.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepository repo;

    public ReviewService(ReviewRepository repo) {
        this.repo = repo;
    }

    // CREATE
    public Review createReview(Review review) {
        review.setCreatedAt(LocalDateTime.now());
        return repo.save(review);
    }

    // GET BY PRODUCT
    public List<Review> getReviewsByProduct(Long productId) {
        return repo.findByProductId(productId);
    }

    //  ADD THIS (THIS FIXES YOUR ERROR)
    public List<Review> getAllReviews() {
        return repo.findAll();
    }
}