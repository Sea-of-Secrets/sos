package com.ssafy.sos.product.domain;

import com.ssafy.sos.global.Entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PurchaseId implements Serializable {

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "product_id")
    private Integer productId;

    @Builder
    private PurchaseId(Long userId, Integer productId) {
        this.userId = userId;
        this.productId = productId;
    }

    @Override
    public int hashCode() {
        return super.hashCode();
    }

    public boolean equals(Object object) {
        return super.equals(object);
    }
}
