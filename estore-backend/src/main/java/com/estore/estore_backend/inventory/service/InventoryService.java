// InventoryService.java
package com.estore.estore_backend.inventory.service;

import com.estore.estore_backend.inventory.entity.Inventory;
import com.estore.estore_backend.inventory.repository.InventoryRepository;
import com.estore.estore_backend.inventory.dto.StockCheckResponse;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    // GET BY PRODUCT ID
    public Inventory getByProductId(Long productId) {
        return inventoryRepository.findByProductId(productId)
                .orElse(null);
    }

    // CHECK AVAILABILITY
    public StockCheckResponse checkAvailability(Long productId, Integer quantity) {
        Inventory inventory = getByProductId(productId);
        
        if (inventory == null) {
            return new StockCheckResponse(false, 0);
        }
        
        boolean available = inventory.getQuantity() >= quantity;
        return new StockCheckResponse(available, inventory.getQuantity());
    }

    // UPDATE STOCK (DECREASE AFTER ORDER)
    public Inventory updateStock(Long productId, Integer quantity) {
        Inventory inventory = getByProductId(productId);
        
        if (inventory == null) {
            throw new RuntimeException("Inventory not found");
        }
        
       System.out.println("=================================");
System.out.println("PRODUCT ID = " + productId);
System.out.println("REQUESTED = " + quantity);
System.out.println("CURRENT STOCK = " + inventory.getQuantity());
System.out.println("=================================");

if (inventory.getQuantity() < quantity) {
    throw new RuntimeException("Stock insuffisant");
}
        
        inventory.setQuantity(inventory.getQuantity() - quantity);
        inventory.setLastUpdated(LocalDateTime.now());
        
        return inventoryRepository.save(inventory);
    }

    // GET ALL (ADMIN)
    public List<Inventory> getAllInventories() {
        return inventoryRepository.findAll();
    }

    // SET QUANTITY (ADMIN)
    public Inventory setQuantity(Long productId, Integer newQuantity) {
        Inventory inventory = getByProductId(productId);
        
        if (inventory == null) {
            throw new RuntimeException("Inventory not found");
        }
        
        inventory.setQuantity(newQuantity);
        inventory.setLastUpdated(LocalDateTime.now());
        
        return inventoryRepository.save(inventory);
    }
}