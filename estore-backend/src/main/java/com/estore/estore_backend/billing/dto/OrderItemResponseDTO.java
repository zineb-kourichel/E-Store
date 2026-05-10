package com.estore.estore_backend.billing.dto;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class OrderItemResponseDTO {
    private Long id;
    private int quantity;
    private Double unitPrice;
    private String productName;
    private Long productId;
}