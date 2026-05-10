package com.estore.estore_backend.inventory.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "inventory")
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long productId;

    private Integer quantity;

    private LocalDateTime lastUpdated;

    // ✅ Constructor with productId and quantity
    public Inventory(Long productId, Integer quantity) {
        this.productId = productId;
        this.quantity = quantity;
        this.lastUpdated = LocalDateTime.now();
    }
}