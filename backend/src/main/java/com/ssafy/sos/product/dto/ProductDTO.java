package com.ssafy.sos.product.dto;

import com.ssafy.sos.product.domain.Grade;
import lombok.Builder;

public class ProductDTO {

    public record Post (String name, String grade) {
    }

    @Builder
    public record Info (String name, Grade grade, String imgUrl, Boolean isSoldOut) {
    }

    @Builder
    public record Result(String name, Grade grade, boolean hasItemAlready, String imgUrl) {
    }
}