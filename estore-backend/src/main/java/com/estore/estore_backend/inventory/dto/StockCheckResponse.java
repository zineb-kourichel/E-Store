// StockCheckResponse.java (DTO)
package com.estore.estore_backend.inventory.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StockCheckResponse {
    private boolean available;
    private Integer quantityAvailable;
}