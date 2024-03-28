package com.ssafy.sos.product.controller;

import com.ssafy.sos.member.domain.UserDTO;
import com.ssafy.sos.product.dto.ProductDTO;
import com.ssafy.sos.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<List<ProductDTO.Response>> getAllProducts() {

        return ResponseEntity.ok().body(productService.getAllProducts());
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @GetMapping("/random")
    public ResponseEntity<ProductDTO.Response> purchaseRandomProduct(Authentication authentication) {

        UserDTO userDTO = (UserDTO) authentication.getPrincipal();

        return ResponseEntity.ok().body(productService.randomProduct(userDTO));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping()
    public ResponseEntity<Void> postProduct(@RequestPart("product") ProductDTO.Post productDto, @RequestPart(value = "file") MultipartFile imageFile) {

        productService.registerProduct(productDto, imageFile);

        return ResponseEntity.ok().body(null);
    }

}
