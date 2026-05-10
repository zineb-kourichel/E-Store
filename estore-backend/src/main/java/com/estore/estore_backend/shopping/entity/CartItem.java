package com.estore.estore_backend.shopping.entity;

import com.estore.estore_backend.catalog.entity.Product;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int quantity;

    private double unitPrice;

    // product in cart item
    @ManyToOne
    private Product product;

    // IMPORTANT: prevent infinite loop
    @ManyToOne
    @JsonIgnore
    private Cart cart;
}