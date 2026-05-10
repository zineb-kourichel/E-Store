// StockCheckRequest.java (DTO)
package com.estore.estore_backend.inventory.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
public class StockCheckRequest {
    private Long productId;
    private Integer quantity;
}