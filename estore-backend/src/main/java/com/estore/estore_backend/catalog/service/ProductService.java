package com.estore.estore_backend.catalog.service;

import com.estore.estore_backend.catalog.dto.ProductDTO;
import com.estore.estore_backend.catalog.entity.Product;
import com.estore.estore_backend.catalog.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // =========================
    // GET ALL PRODUCTS
    // =========================
    public List<ProductDTO> getAllProducts() {

        List<Product> products = productRepository.findAll();

        if (products == null || products.isEmpty()) {
            return Collections.emptyList();
        }

        return products.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // =========================
    // GET PRODUCT BY ID (SAFE)
    // =========================
    public ProductDTO getProductById(Long id) {

        if (id == null) {
            throw new IllegalArgumentException("Product ID cannot be null");
        }

        Optional<Product> product = productRepository.findById(id);

        return product
                .map(this::mapToDTO)
                .orElseThrow(() ->
                        new RuntimeException("Product not found with id: " + id)
                );
    }

    // =========================
    // SAVE PRODUCT
    // =========================
    public Product saveProduct(Product product) {

        if (product == null) {
            throw new IllegalArgumentException("Product cannot be null");
        }

        return productRepository.save(product);
    }

    // =========================
    // DTO MAPPER
    // =========================
    private ProductDTO mapToDTO(Product product) {

        if (product == null) return null;

        return new ProductDTO(
                product.getId(),
                product.getName(),
                product.getPrice(),
                product.getDescription(),
                product.getImageUrl(),
                product.getCategory() != null
                        ? product.getCategory().getName()
                        : null
        );
    }
}