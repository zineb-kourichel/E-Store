package com.estore.estore_backend.catalog.repository;



import com.estore.estore_backend.catalog.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}