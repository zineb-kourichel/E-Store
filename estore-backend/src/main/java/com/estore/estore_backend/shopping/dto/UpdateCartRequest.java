package com.estore.estore_backend.shopping.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateCartRequest {

    private Long itemId;
    private int quantity;
}