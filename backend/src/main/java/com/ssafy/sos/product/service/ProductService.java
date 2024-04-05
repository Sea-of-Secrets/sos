package com.ssafy.sos.product.service;

import com.ssafy.sos.product.dto.ProductDTO;
import com.ssafy.sos.user.domain.CustomOAuth2User;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {

    List<ProductDTO.Info> getAllProducts();

    void registerProduct(ProductDTO.Post productDTO, MultipartFile imageFile);

    ProductDTO.Result randomProduct(CustomOAuth2User userDTO);
}