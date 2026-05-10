package com.estore.estore_backend.catalog.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private double price;
    private String imageUrl;
    private String description;

    // =========================
    // RELATIONSHIP
    // =========================
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = true)
    @JsonIgnoreProperties("products")
    private Category category;

    // =========================
    // CONSTRUCTORS
    // =========================
    public Product() {
    }

    // Used by DataLoader / manual creation
    public Product(String name, double price, Category category, String imageUrl, String description) {
        this.name = name;
        this.price = price;
        this.category = category;
        this.imageUrl = imageUrl;
        this.description = description;
    }

    // =========================
    // GETTERS
    // =========================
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public String getDescription() {
        return description;
    }

    public Category getCategory() {
        return category;
    }

    // =========================
    // SETTERS
    // =========================
    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}