package com.ssafy.sos.product.controller;

import com.ssafy.sos.product.dto.ProductDTO;
import com.ssafy.sos.product.service.ProductService;
import com.ssafy.sos.user.domain.CustomOAuth2User;
import com.ssafy.sos.user.domain.UserDTO;
import com.ssafy.sos.user.domain.UserEntity;
import com.ssafy.sos.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
    private final UserService userService;
    private final ProductService productService;

    @GetMapping
    public ResponseEntity<List<ProductDTO.Info>> getAllProducts() {

        return ResponseEntity.ok().body(productService.getAllProducts());
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/random")
    public ResponseEntity<?> purchaseRandomProduct(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("로그인해야 가능합니다.");
        }

        CustomOAuth2User user = (CustomOAuth2User) authentication.getPrincipal();
        if (user == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("로그인해야 가능합니다.");
        }

        UserEntity userInfo = userService.getUserInfo(user);

        if (userInfo.getWalletAddress() == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("지갑이 없습니다");
        }

        return ResponseEntity.ok().body(productService.randomProduct(user));
    }


//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<Void> postProduct(@RequestPart("product") ProductDTO.Post productDto, @RequestPart(value = "file") MultipartFile imageFile) {

        productService.registerProduct(productDto, imageFile);

        return ResponseEntity.ok().body(null);
    }
}
