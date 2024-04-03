package com.ssafy.sos.product.domain;

import com.ssafy.sos.global.Entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

@Entity
@Table(name = "product")
@Getter
@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Product extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Integer id;

    private String name;

    @Enumerated(EnumType.STRING)
    private Grade grade;

    @Column(length = 1024)
    private String imageUrl;

    private String imageName;

    @ColumnDefault("false")
    private Boolean isSoldOut;

    @Builder
    private Product(Integer id, String name, Grade grade, String imageUrl, String imageName, Boolean isSoldOut) {
        this.id = id;
        this.name = name;
        this.grade = grade;
        this.imageUrl = imageUrl;
        this.imageName = imageName;
        this.isSoldOut = isSoldOut;
    }

    public void soldOut() {
        this.isSoldOut = true;
    }
}