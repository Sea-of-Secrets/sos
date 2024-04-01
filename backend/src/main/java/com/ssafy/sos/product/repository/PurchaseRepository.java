package com.ssafy.sos.product.repository;

import com.ssafy.sos.product.domain.Purchase;
import com.ssafy.sos.product.domain.PurchaseId;
import com.ssafy.sos.user.domain.UserEntity;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PurchaseRepository extends JpaRepository<Purchase, PurchaseId> {
    @EntityGraph(attributePaths = {"userId", "productId"})
    List<Purchase> findByUserId(UserEntity user);
}
