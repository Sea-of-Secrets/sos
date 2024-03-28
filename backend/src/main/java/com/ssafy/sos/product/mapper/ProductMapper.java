package com.ssafy.sos.product.mapper;

import com.ssafy.sos.product.domain.Product;
import com.ssafy.sos.product.dto.ProductDTO;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProductMapper {
    public List<ProductDTO.Response> entityToDtoForList(List<Product> list) {

        return list.stream().map(product -> ProductDTO.Response.builder()
                .name(product.getName())
                .description(product.getDescription())
                .imgUrl(product.getImageUrl())
                .isUnique(product.getIsUnique())
                .isSoldOut(product.getIsSoldOut())
                .build()).toList();
    }

    public ProductDTO.Response entityToDto(Product product) {

        return ProductDTO.Response.builder()
                .name(product.getName())
                .description(product.getDescription())
                .imgUrl(product.getImageUrl())
                .isUnique(product.getIsUnique())
                .isSoldOut(product.getIsSoldOut())
                .build();
    }
}