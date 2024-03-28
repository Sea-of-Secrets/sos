package com.ssafy.sos.product.domain;

import com.ssafy.sos.global.Entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Table(name = "product")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Product extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Integer id;

    private String name;

    private String description;

    @Column(length = 1024)
    private String imageUrl;

    private String imageName;

    @ColumnDefault("false")
    private Boolean isUnique;

    @ColumnDefault("false")
    private Boolean isSoldOut;

    @Builder
    private Product(Integer id, String name, String description, String imageUrl, String imageName, Boolean isUnique, Boolean isSoldOut) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.imageName = imageName;
        this.isUnique = isUnique;
        this.isSoldOut = isSoldOut;
    }

    public void soldOut() {
        this.isSoldOut = true;
    }
}