package com.ssafy.sos.product.service;

import com.ssafy.sos.member.domain.UserDTO;
import com.ssafy.sos.product.domain.Product;
import com.ssafy.sos.product.dto.ProductDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {

    List<ProductDTO.Response> getAllProducts();

    ProductDTO.Response randomProduct(UserDTO userDTO);

    void registerProduct(ProductDTO.Post productDTO, MultipartFile imageFile);
}