package com.ssafy.sos.product.repository;

import com.ssafy.sos.product.domain.Grade;
import com.ssafy.sos.product.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    Optional<Product> findByName(String name);

    List<Product> findByIsDeletedFalse();

    List<Product> findByGradeAndIsDeletedFalseAndIsSoldOutFalse(Grade grade);
}