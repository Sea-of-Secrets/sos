package com.ssafy.sos.product.repository;

import com.ssafy.sos.product.domain.Purchase;
import com.ssafy.sos.product.domain.PurchaseId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseRepository extends JpaRepository<Purchase, PurchaseId> {
}
