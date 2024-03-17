package com.ssafy.sos.product.controller;

import com.ssafy.sos.product.domain.ProductDTO;
import com.ssafy.sos.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping("/shops")
    public ResponseEntity<List<ProductDTO>> getAllProductList() {
        return ResponseEntity.ok(productService.getProductList());
    }
}
