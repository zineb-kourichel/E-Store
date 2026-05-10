package com.estore.estore_backend.billing.dto;

import java.util.List;

public class OrderRequestDTO {

    private Long userId;
    private String modePaiement;
    private List<OrderItemDTO> items;

    public OrderRequestDTO() {}

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getModePaiement() {
        return modePaiement;
    }

    public void setModePaiement(String modePaiement) {
        this.modePaiement = modePaiement;
    }

    public List<OrderItemDTO> getItems() {
        return items;
    }

    public void setItems(List<OrderItemDTO> items) {
        this.items = items;
    }
}