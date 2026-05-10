package com.estore.estore_backend.billing.service;

import com.estore.estore_backend.billing.dto.OrderItemDTO;
import com.estore.estore_backend.billing.dto.OrderItemResponseDTO;
import com.estore.estore_backend.billing.dto.OrderRequestDTO;
import com.estore.estore_backend.billing.dto.OrderResponseDTO;
import com.estore.estore_backend.billing.entity.Order;
import com.estore.estore_backend.billing.entity.OrderItem;
import com.estore.estore_backend.billing.repository.OrderRepository;
import com.estore.estore_backend.catalog.entity.Product;
import com.estore.estore_backend.catalog.repository.ProductRepository;
import com.estore.estore_backend.customer.entity.User;
import com.estore.estore_backend.customer.repository.UserRepository;
import com.estore.estore_backend.inventory.service.InventoryService;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final InventoryService inventoryService;

    public OrderService(OrderRepository orderRepository,
                        UserRepository userRepository,
                        ProductRepository productRepository,
                        InventoryService inventoryService) {

        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.inventoryService = inventoryService;
    }

    @Transactional
    public OrderResponseDTO createOrder(OrderRequestDTO dto) {

        // VALIDATION
        if (dto == null || dto.getUserId() == null) {
            throw new RuntimeException("Invalid order request");
        }

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        if (dto.getItems() == null || dto.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        // CREATE ORDER
        Order order = new Order();

        order.setUser(user);
        order.setStatus("CONFIRMED");
        order.setModePaiement(dto.getModePaiement());

        List<OrderItem> items = new ArrayList<>();

        double total = 0.0;

        for (OrderItemDTO itemDTO : dto.getItems()) {

            if (itemDTO == null) {
                continue;
            }

            Product product = productRepository
                    .findById(itemDTO.getProductId())
                    .orElseThrow(() ->
                            new RuntimeException("Product not found"));

            int qty = itemDTO.getQuantity();

            if (qty <= 0) {
                throw new RuntimeException(
                        "Quantity must be > 0"
                );
            }

            // THIS IS THE IMPORTANT FIX
            inventoryService.updateStock(
                    product.getId(),
                    qty
            );

            // CREATE ORDER ITEM
            OrderItem item = new OrderItem();

            item.setProduct(product);
            item.setQuantity(qty);
            item.setUnitPrice(product.getPrice());
            item.setOrder(order);

            total += product.getPrice() * qty;

            items.add(item);
        }

        order.setItems(items);
        order.setTotalAmount(total);

        Order savedOrder = orderRepository.save(order);

        return toDTO(savedOrder);
    }

    public List<OrderResponseDTO> getOrdersByUser(Long userId) {

        if (userId == null) {
            throw new RuntimeException(
                    "User ID is required"
            );
        }

        return orderRepository.findByUserId(userId)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public OrderResponseDTO cancelOrder(Long orderId) {

        if (orderId == null) {
            throw new RuntimeException(
                    "Order ID is required"
            );
        }

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Order not found"
                        ));

        order.setStatus("CANCELLED");

        return toDTO(orderRepository.save(order));
    }

    // DTO MAPPER

    private OrderResponseDTO toDTO(Order order) {

        List<OrderItemResponseDTO> itemDTOs =
                order.getItems()
                        .stream()
                        .map(i -> new OrderItemResponseDTO(
                                i.getId(),
                                i.getQuantity(),
                                i.getUnitPrice(),
                                i.getProduct().getName(),
                                i.getProduct().getId()
                        ))
                        .toList();

        return new OrderResponseDTO(
                order.getId(),
                order.getStatus(),
                order.getModePaiement(),
                order.getTotalAmount(),
                order.getOrderDate(),
                order.getUser().getId(),
                itemDTOs
        );
    }
}