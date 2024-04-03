package com.ssafy.sos.nft.domain;

import com.ssafy.sos.product.domain.Grade;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
public class NFTDTO {
    private String walletAddress;
    private String file;
    private String author;
    private String title;
    private Grade grade;

    public NFTDTO(String walletAddress, String file, String title, Grade grade) {
        this.walletAddress = walletAddress;
        this.file = file;
        this.author = "SOS";
        this.title = title;
        this.grade = grade;
    }
}
