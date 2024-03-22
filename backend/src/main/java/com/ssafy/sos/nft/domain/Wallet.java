package com.ssafy.sos.nft.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Wallet {
    @Id
    private String address;
    private String mnemonic;
    private String privateKey;
}
