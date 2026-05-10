package com.estore.estore_backend.catalog.controller;

import com.estore.estore_backend.catalog.entity.Category;
import com.estore.estore_backend.catalog.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    // =========================
    // GET ALL CATEGORIES
    // =========================
    @GetMapping
    public ResponseEntity<List<Category>> getAll() {

        List<Category> categories = categoryService.getAllCategories();

        if (categories == null || categories.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(categories);
    }

    // =========================
    // CREATE CATEGORY
    // =========================
    @PostMapping
    public ResponseEntity<?> create(@RequestBody Category category) {

        try {
            if (category == null || category.getName() == null || category.getName().isBlank()) {
                return ResponseEntity.badRequest().body("Category name is required");
            }

            Category saved = categoryService.save(category);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating category: " + e.getMessage());
        }
    }

    // =========================
    // GET CATEGORY BY ID (FIXED)
    // =========================
    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable long id) {

        try {
            Category category = categoryService.getById(id);

            if (category == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Category not found");
            }

            return ResponseEntity.ok(category);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error retrieving category: " + e.getMessage());
        }
    }
}