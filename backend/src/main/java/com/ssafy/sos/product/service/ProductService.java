package com.ssafy.sos.product.service;

import com.ssafy.sos.product.dto.ProductDTO;
import com.ssafy.sos.user.domain.CustomOAuth2User;
import com.ssafy.sos.user.domain.UserDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {

    List<ProductDTO.Response> getAllProducts();

    ProductDTO.Response randomProduct(CustomOAuth2User userDTO);

    void registerProduct(ProductDTO.Post productDTO, MultipartFile imageFile);
}