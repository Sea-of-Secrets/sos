package com.ssafy.sos.product.controller;

import com.ssafy.sos.product.dto.ProductDTO;
import com.ssafy.sos.product.service.ProductService;
import com.ssafy.sos.user.domain.CustomOAuth2User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Controller
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<List<ProductDTO.Info>> getAllProducts() {

        return ResponseEntity.ok().body(productService.getAllProducts());
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/random")
    public ResponseEntity<?> purchaseRandomProduct(Authentication authentication) {

        CustomOAuth2User user = (CustomOAuth2User) authentication.getPrincipal();

        return ResponseEntity.ok().body(productService.randomProduct(user));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<Void> postProduct(@RequestPart("product") ProductDTO.Post productDto, @RequestPart(value = "file") MultipartFile imageFile) {

        productService.registerProduct(productDto, imageFile);

        return ResponseEntity.ok().body(null);
    }
}
