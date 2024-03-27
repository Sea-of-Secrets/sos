package com.ssafy.sos.nft.service;

import com.ssafy.sos.nft.domain.FileEntity;
import com.ssafy.sos.nft.repository.FileRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class NFTServiceTest {
    @Autowired
    public NFTService nftService;

    @Test
    public void fileTest() {
        List<FileEntity> nftFile = nftService.getNFTFile();

        System.out.println(nftFile);
    }
}