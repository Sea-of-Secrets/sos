package com.ssafy.sos.product.dto;

import lombok.Builder;

public class ProductDTO {

    public record Post (String name, String description, Boolean isUnique) {
    }

    @Builder
    public record Response (String name, String description, String imgUrl, Boolean isUnique, Boolean isSoldOut) {
    }
}