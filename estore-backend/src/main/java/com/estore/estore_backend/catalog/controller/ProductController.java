package com.estore.estore_backend.catalog.controller;

import com.estore.estore_backend.catalog.dto.ProductDTO;
import com.estore.estore_backend.catalog.entity.Product;
import com.estore.estore_backend.catalog.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin("*")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // ✅ GET ALL PRODUCTS (DTO)
    @GetMapping
    public List<ProductDTO> getAll() {
        return productService.getAllProducts();
    }

    // ✅ GET PRODUCT BY ID (DTO)
    @GetMapping("/{id}")
    public ProductDTO getOne(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    // ✅ CREATE PRODUCT (Entity is fine here)
    @PostMapping
    public Product create(@RequestBody Product product) {
        return productService.saveProduct(product);
    }
}