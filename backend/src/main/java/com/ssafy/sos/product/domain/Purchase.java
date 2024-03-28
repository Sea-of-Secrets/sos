package com.ssafy.sos.product.domain;

import com.ssafy.sos.global.Entity.BaseEntity;
import com.ssafy.sos.member.domain.UserEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "purchase")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Purchase extends BaseEntity {

    @EmbeddedId
    private PurchaseId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private UserEntity userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    private Product productId;

    @Builder
    private Purchase(PurchaseId id, UserEntity userId, Product productId) {
        this.id = id;
        this.userId = userId;
        this.productId = productId;
    }
}
