package com.estore.estore_backend.shopping.service;

import com.estore.estore_backend.customer.entity.User;
import com.estore.estore_backend.customer.repository.UserRepository;
import com.estore.estore_backend.shopping.entity.Cart;
import com.estore.estore_backend.shopping.entity.CartItem;
import com.estore.estore_backend.shopping.repository.CartItemRepository;
import com.estore.estore_backend.shopping.repository.CartRepository;
import com.estore.estore_backend.catalog.entity.Product;
import com.estore.estore_backend.catalog.repository.ProductRepository;
import org.springframework.stereotype.Service;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public CartService(CartRepository cartRepository,
                       CartItemRepository cartItemRepository,
                       UserRepository userRepository,
                       ProductRepository productRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    // =========================
    // GET CART
    // =========================
    public Cart getCart(Long userId) {
        // FIX: Add null check for userId
        if (userId == null) {
            throw new IllegalArgumentException("User ID cannot be null");
        }

        return cartRepository.findByUserId(userId)
                .orElseGet(() -> {
                    User user = userRepository.findById(userId)
                            .orElseThrow(() -> new RuntimeException("User not found"));

                    Cart cart = new Cart();
                    cart.setUser(user);

                    return cartRepository.save(cart);
                });
    }

    // =========================
    // ADD TO CART
    // =========================
    public Cart addToCart(Long userId, Long productId, int quantity) {
        // FIX: Add null checks and validation
        if (userId == null) {
            throw new IllegalArgumentException("User ID cannot be null");
        }
        if (productId == null) {
            throw new IllegalArgumentException("Product ID cannot be null");
        }
        if (quantity <= 0) {
            throw new IllegalArgumentException("Quantity must be greater than 0");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Cart cart = cartRepository.findByUserId(userId)
                .orElseGet(() -> {
                    Cart c = new Cart();
                    c.setUser(user);
                    return cartRepository.save(c);
                });

        // FIX: Use proper Long comparison with .equals()
        // Also handle null items list safely
        if (cart.getItems() != null && !cart.getItems().isEmpty()) {
            for (CartItem existing : cart.getItems()) {
                if (existing != null && existing.getProduct() != null && 
                    existing.getProduct().getId() != null &&
                    existing.getProduct().getId().equals(productId)) {
                    existing.setQuantity(existing.getQuantity() + quantity);
                    cartItemRepository.save(existing);
                    return cartRepository.save(cart);
                }
            }
        }

        CartItem item = new CartItem();
        item.setCart(cart);
        item.setProduct(product);
        item.setQuantity(quantity);
        item.setUnitPrice(product.getPrice());

        cartItemRepository.save(item);

        cart.getItems().add(item);

        return cartRepository.save(cart);
    }

    // =========================
    // UPDATE QUANTITY
    // =========================
    public Cart updateQuantity(Long itemId, int quantity) {
        // FIX: Add validation for itemId and quantity
        if (itemId == null) {
            throw new IllegalArgumentException("Item ID cannot be null");
        }
        if (quantity <= 0) {
            throw new IllegalArgumentException("Quantity must be greater than 0");
        }

        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        item.setQuantity(quantity);
        cartItemRepository.save(item);

        return item.getCart();
    }

    // =========================
    // REMOVE ITEM
    // =========================
    public void removeItem(Long itemId) {
        // FIX: Add null check for itemId
        if (itemId == null) {
            throw new IllegalArgumentException("Item ID cannot be null");
        }

        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        Cart cart = item.getCart();

        // FIX: Check if items list exists and is not null before removing
        if (cart != null && cart.getItems() != null) {
            cart.getItems().remove(item);
        }

        cartItemRepository.delete(item);

        if (cart != null) {
            cartRepository.save(cart);
        }
    }
}