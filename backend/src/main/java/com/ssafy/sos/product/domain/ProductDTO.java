package com.ssafy.sos.product.domain;

public record ProductDTO(
        Long id,
        Long userId,
        String nftId,
        String title,
        String description,
        String imageUrl,
        Long price,
        Boolean isSoldOut
) {}
