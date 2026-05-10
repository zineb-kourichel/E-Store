package com.estore.estore_backend.customer.service;

import com.estore.estore_backend.customer.entity.User;
import com.estore.estore_backend.customer.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository repo;

    public AuthService(UserRepository repo) {
        this.repo = repo;
    }

    // =========================
    // REGISTER (FIXED)
    // =========================
    public User register(User user) {

        if (user == null) {
            throw new RuntimeException("User cannot be null");
        }

        if (user.getEmail() == null || user.getEmail().isBlank()) {
            throw new RuntimeException("Email is required");
        }

        if (user.getPassword() == null || user.getPassword().isBlank()) {
            throw new RuntimeException("Password is required");
        }

        if (repo.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        return repo.save(user);
    }

    // =========================
    // LOGIN (FIXED SAFETY)
    // =========================
    public User login(String email, String password) {

        if (email == null || password == null) {
            throw new RuntimeException("Email and password required");
        }

        User user = repo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }
}