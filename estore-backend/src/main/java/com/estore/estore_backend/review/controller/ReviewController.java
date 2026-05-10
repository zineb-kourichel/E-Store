package com.estore.estore_backend.review.controller;

import com.estore.estore_backend.review.entity.Review;
import com.estore.estore_backend.review.service.ReviewService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/reviews")
@CrossOrigin("*")
public class ReviewController {

    private final ReviewService service;

    public ReviewController(ReviewService service) {
        this.service = service;
    }

    // ✅ GET ALL REVIEWS
    @GetMapping
    public List<Review> getAllReviews() {
        return service.getAllReviews();
    }

    // GET BY PRODUCT
    @GetMapping("/product/{productId}")
    public List<Review> getByProduct(@PathVariable Long productId) {
        return service.getReviewsByProduct(productId);
    }

    // CREATE
    @PostMapping
    public Review create(@RequestBody Review review) {
        return service.createReview(review);
    }
}