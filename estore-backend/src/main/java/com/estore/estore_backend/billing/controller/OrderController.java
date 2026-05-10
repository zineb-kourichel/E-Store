package com.estore.estore_backend.billing.controller;

import com.estore.estore_backend.billing.dto.OrderRequestDTO;
import com.estore.estore_backend.billing.dto.OrderResponseDTO;
import com.estore.estore_backend.billing.service.OrderService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<OrderResponseDTO> createOrder(
            @RequestBody OrderRequestDTO dto
    ) {

        return ResponseEntity.ok(
                orderService.createOrder(dto)
        );
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderResponseDTO>> getOrders(
            @PathVariable Long userId
    ) {

        return ResponseEntity.ok(
                orderService.getOrdersByUser(userId)
        );
    }

    @PutMapping("/cancel/{orderId}")
    public ResponseEntity<OrderResponseDTO> cancelOrder(
            @PathVariable Long orderId
    ) {

        return ResponseEntity.ok(
                orderService.cancelOrder(orderId)
        );
    }
}