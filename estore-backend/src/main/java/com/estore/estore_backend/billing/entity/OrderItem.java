package com.estore.estore_backend.billing.entity;

import com.estore.estore_backend.catalog.entity.Product;
import com.fasterxml.jackson.annotation.JsonIgnore; // ← add this import
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "order_items")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int quantity;

    private Double unitPrice;

     @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    @JsonIgnore  // ← add this
    private Order order;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
}