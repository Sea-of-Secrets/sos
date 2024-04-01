package com.ssafy.sos.product.repository;

import com.ssafy.sos.product.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    Optional<Product> findById(Integer id);
    List<Product> findByIsDeletedFalse();

    List<Product> findByIsUniqueFalseAndIsDeletedFalseAndIsSoldOutFalse();

    List<Product> findByIsUniqueTrueAndIsDeletedFalseAndIsSoldOutFalse();
}
