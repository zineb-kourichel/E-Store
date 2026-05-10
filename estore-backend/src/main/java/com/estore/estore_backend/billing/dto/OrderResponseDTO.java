package com.estore.estore_backend.billing.dto;

import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class OrderResponseDTO {
    private Long id;
    private String status;
    private String modePaiement;
    private Double totalAmount;
    private LocalDateTime orderDate;
    private Long userId;
    private List<OrderItemResponseDTO> items;
}