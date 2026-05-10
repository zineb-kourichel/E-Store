package com.estore.estore_backend.shopping.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddToCartRequest {
    private Long userId;
    private Long productId;
    private int quantity;
}