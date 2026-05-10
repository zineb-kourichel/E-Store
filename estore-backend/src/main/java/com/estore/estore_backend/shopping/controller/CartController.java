package com.estore.estore_backend.shopping.controller;

import com.estore.estore_backend.shopping.entity.Cart;
import com.estore.estore_backend.shopping.service.CartService;
import com.estore.estore_backend.shopping.dto.AddToCartRequest;
import com.estore.estore_backend.shopping.dto.UpdateCartRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin("*")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    // GET CART BY USER
    @GetMapping("/{userId}")
    public Cart getCart(@PathVariable Long userId) {
        return cartService.getCart(userId);
    }

    // ADD ITEM TO CART
    @PostMapping("/add")
    public Cart addToCart(@RequestBody AddToCartRequest request) {
        return cartService.addToCart(
                request.getUserId(),
                request.getProductId(),
                request.getQuantity()
        );
    }

    // UPDATE QUANTITY
    @PutMapping("/update")
    public Cart updateQuantity(@RequestBody UpdateCartRequest request) {
        return cartService.updateQuantity(
                request.getItemId(),
                request.getQuantity()
        );
    }

    // REMOVE ITEM
    @DeleteMapping("/remove/{itemId}")
    public void removeItem(@PathVariable Long itemId) {
        cartService.removeItem(itemId);
    }
}