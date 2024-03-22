package com.ssafy.sos.nft.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class FileEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private String fileName;
    private String filePath;
    private String fileNameExtension;

    @Column(unique=true)
    private String title;
    private String description;
}
