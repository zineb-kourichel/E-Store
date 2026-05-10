package com.estore.estore_backend.catalog.service;

import com.estore.estore_backend.catalog.entity.Category;
import com.estore.estore_backend.catalog.repository.CategoryRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category getById(@NonNull Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
    }

    public <S extends Category> S save(@NonNull S category) {
        return categoryRepository.save(category);
    }
}