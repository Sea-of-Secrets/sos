package com.ssafy.sos.nft.service;

import com.ssafy.sos.nft.domain.FileEntity;
import com.ssafy.sos.nft.repository.FileRepository;
import com.ssafy.sos.nft.repository.WalletRepository;
import com.ssafy.sos.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.annotation.Rollback;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
class NFTServiceTest {
    @Mock
    private UserRepository userRepository;

    @Autowired
    private FileRepository fileRepository;

    @Mock
    private WalletRepository walletRepository;

    @InjectMocks
    private NFTService nftService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    @Transactional
    public void testSaveFile() throws Exception {
        // MockMultipartFile 대신 실제 파일을 사용하도록 변경
//        String title = "Test Title";
//        String description = "Test Description";
//        MockMultipartFile file = new MockMultipartFile("file", "test.jpg", "image/jpeg", "test data".getBytes());
//
//        // 파일 저장 메서드 호출
//        long fileId = nftService.saveFile(file, title, description);
//
//        System.out.println(fileId);
//        // 반환된 fileId가 유효한지 확인
//        Assertions.assertThat(fileId).isNotEqualTo(-1);
    }

    @Test
    public void fileTest() {
        List<FileEntity> nftFile = nftService.getNFTFiles();

        System.out.println(nftFile);
    }
}