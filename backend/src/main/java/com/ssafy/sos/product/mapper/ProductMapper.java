package com.ssafy.sos.product.mapper;

import com.ssafy.sos.product.domain.Product;
import com.ssafy.sos.product.dto.ProductDTO;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProductMapper {
    public List<ProductDTO.Info> entityToDtoForList(List<Product> list) {

        return list.stream().map(product -> ProductDTO.Info.builder()
                .name(product.getName())
                .grade(product.getGrade())
                .imgUrl(product.getImageUrl())
                .isSoldOut(product.getIsSoldOut())
                .build()).toList();
    }

    public ProductDTO.Result entityToDto(Product product, boolean hasItemAlready) {

        return ProductDTO.Result.builder()
                .name(product.getName())
                .grade(product.getGrade())
                .hasItemAlready(hasItemAlready)
                .imgUrl(product.getImageUrl())
                .build();
    }
}