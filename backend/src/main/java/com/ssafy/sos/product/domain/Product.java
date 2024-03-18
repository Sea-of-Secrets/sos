package com.ssafy.sos.product.domain;

import com.ssafy.sos.member.domain.UserEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    private String nftId;

    private String title;

    private String description;

    @Column(length = 1024)
    private String imageUrl;

    private Long price;

    private Boolean isSoldOut;
}
