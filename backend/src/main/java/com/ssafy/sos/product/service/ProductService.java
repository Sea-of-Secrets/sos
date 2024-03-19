package com.ssafy.sos.product.service;

import com.ssafy.sos.product.domain.Product;
import com.ssafy.sos.product.domain.ProductDTO;

import java.util.List;

public interface ProductService {
    List<ProductDTO> getProductList();
    Product registerProduct(Product product);
}
