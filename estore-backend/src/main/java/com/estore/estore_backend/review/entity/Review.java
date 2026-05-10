package com.estore.estore_backend.review.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "reviews")
public class Review {

    @Id
    private String id;

    private Long productId;

    private Long userId;

    private String userName;

    private int rating;

    private String comment;

    private LocalDateTime createdAt = LocalDateTime.now();
}