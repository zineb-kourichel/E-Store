package com.estore.estore_backend.catalog.dto;

public class ProductDTO {

    private Long id;
    private String name;
    private double price;
    private String description;
    private String imageUrl;
    private String category;

    public ProductDTO(Long id, String name, double price,
                      String description, String imageUrl, String category) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this.category = category;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public double getPrice() { return price; }
    public String getDescription() { return description; }
    public String getImageUrl() { return imageUrl; }
    public String getCategory() { return category; }
}