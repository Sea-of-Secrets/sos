package com.ssafy.sos.product.service;

import com.ssafy.sos.product.domain.Product;
import com.ssafy.sos.product.domain.ProductDTO;
import com.ssafy.sos.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    @Override
    @Transactional(readOnly = true)
    public List<ProductDTO> getProductList() {
        return productRepository.findAllProducts();
    }

    @Override
    public Product registerProduct(Product product) {
        return productRepository.save(product);
    }
}
