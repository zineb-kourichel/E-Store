package com.estore.estore_backend.inventory.controller;

import com.estore.estore_backend.inventory.entity.Inventory;
import com.estore.estore_backend.inventory.service.InventoryService;
import com.estore.estore_backend.inventory.dto.StockCheckRequest;
import com.estore.estore_backend.inventory.dto.StockCheckResponse;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@CrossOrigin("*")
public class InventoryController {

    private final InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    // GET INVENTORY BY PRODUCT
    @GetMapping("/product/{productId}")
    public Inventory getInventoryByProduct(@PathVariable Long productId) {
        return inventoryService.getByProductId(productId);
    }

    // CHECK IF QUANTITY IS AVAILABLE
    @PostMapping("/check")
    public StockCheckResponse checkStock(@RequestBody StockCheckRequest request) {
        return inventoryService.checkAvailability(request.getProductId(), request.getQuantity());
    }

    // UPDATE INVENTORY AFTER ORDER
    @PutMapping("/update")
    public Inventory updateInventory(@RequestBody StockCheckRequest request) {
        return inventoryService.updateStock(request.getProductId(), request.getQuantity());
    }

    // GET ALL INVENTORIES (ADMIN)
    @GetMapping
    public List<Inventory> getAllInventories() {
        return inventoryService.getAllInventories();
    }

    // UPDATE INVENTORY QUANTITY (ADMIN)
    @PutMapping("/{productId}")
    public Inventory updateQuantity(@PathVariable Long productId, @RequestBody StockCheckRequest request) {
        return inventoryService.setQuantity(productId, request.getQuantity());
    }
}