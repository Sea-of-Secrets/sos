package com.ssafy.sos.nft.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class NFTDTO {
    private String file;
    private String author;
    private String title;
    private String description;

    public NFTDTO(String file, String title, String description) {
        this.file = file;
        this.author = "SOS";
        this.title = title;
        this.description = description;
    }
}
