package com.ssafy.sos.nft.service;

import com.ssafy.sos.user.domain.CustomOAuth2User;
import com.ssafy.sos.user.domain.UserEntity;
import com.ssafy.sos.user.repository.UserRepository;
import com.ssafy.sos.nft.domain.FileEntity;
import com.ssafy.sos.nft.domain.NFTDTO;
import com.ssafy.sos.nft.domain.NFTResponse;
import com.ssafy.sos.nft.domain.Wallet;
import com.ssafy.sos.nft.repository.FileRepository;
import com.ssafy.sos.nft.repository.WalletRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.apache.commons.io.FileUtils;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class NFTService {
    private final UserRepository userRepository;
    private final FileRepository fileRepository;
    private final WalletRepository walletRepository;
    private final String BLOCK_SERVER_URL = "http://localhost:4000";

    private static final String PATH = "C:/Users/SSAFY/Desktop";

    public long saveFile(MultipartFile file, String title, String description) throws Exception {
        // 파일을 저장할 디렉토리 경로 설정 (원하는 경로로 수정하세요)
        Path basePath = Paths.get(PATH);
        Path savePath = basePath.resolve("uploads/image");
        String absolutePathString = savePath.toString();

        // 파일의 원본 이름 가져오기
        String originalFileName = file.getOriginalFilename();
        String fileName = originalFileName.substring(0, originalFileName.indexOf(".")); // image
        String name = UUID.randomUUID().toString() + "_" + fileName; // uuid_image
        String fileNameExtension = originalFileName.substring(originalFileName.lastIndexOf(".") + 1); // jpg
        String filePath = Path.of(absolutePathString, name).toString(); // path/uuid_image

        // 파일 저장할 폴더 없다면 생성
        if (!savePath.toFile().exists()) {
            savePath.toFile().mkdirs();
        }

        // 로컬 저장
        file.transferTo(new File(filePath + "." + fileNameExtension));

        // db 저장
        FileEntity fileEntity = new FileEntity();
        fileEntity.setName(name); //서버 저장 파일명
        fileEntity.setFileName(fileName); //원본 파일 명
        fileEntity.setFilePath(filePath); // 서버경로+서버저장파일명
        fileEntity.setFileNameExtension(fileNameExtension); // 파일 확장자
        fileEntity.setDescription(description);
        fileEntity.setTitle(title);

        try {
            fileRepository.save(fileEntity);
            if (fileEntity.getId() != null) {
                return fileEntity.getId();
            } else {
                // 파일 엔티티가 저장되지 않았을 때의 처리
                throw new Exception("Failed to save file entity");
            }
        } catch(Exception e) {
            e.printStackTrace();
            return -1;
        }
    }

    public void mintingNFT(CustomOAuth2User user, String fileId) throws Exception {
        UserEntity userEntity = userRepository.findByUsername(user.getUserDto().getUsername());
        System.out.println(userEntity);
        if (userEntity.getWalletAddress() == null) {
            System.out.println("지갑 없음");
            return;
        }

        Optional<FileEntity> opt = fileRepository.findById(Long.valueOf(fileId));
        FileEntity fileEntity = opt.get();
        if (fileEntity == null) {
            System.out.println("파일 없음");
            return;
        }

        Path filePath = Paths.get(fileEntity.getFilePath() + "." + fileEntity.getFileNameExtension());
        File file = new File(String.valueOf(filePath));
        byte[] fileContent = FileUtils.readFileToByteArray(file);
        String fileData = Base64.getEncoder().encodeToString(fileContent);

        if (userEntity.getWalletAddress() == null) {
            return;
        }

        //NFT 생성
        NFTDTO nft = new NFTDTO(userEntity.getWalletAddress(), fileData, fileEntity.getTitle(), fileEntity.getDescription());

        RestTemplate restTemplate = new RestTemplate();
        // HTTP 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // HTTP 요청 본문에 객체 추가
        HttpEntity<NFTDTO> requestEntity = new HttpEntity<>(nft, headers);

        // REST 템플릿을 사용하여 POST 요청 전송
        try {
            restTemplate.postForObject(BLOCK_SERVER_URL + "/nft", requestEntity, Void.class);
        } catch (Exception e) {
            throw new Exception(e);
        }
    }

    @Transactional
    public Wallet makeWallet(CustomOAuth2User user) {
        //user 찾기
        UserEntity userEntity = userRepository.findByUsername(user.getUserDto().getUsername());
        if (userEntity.getWalletAddress() != null) {
            return null;
        }

        RestTemplate restTemplate = new RestTemplate();
        // HTTP 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // HTTP 요청 본문에 객체 추가
        HttpEntity<NFTDTO> requestEntity = new HttpEntity<>(headers);

        // REST 템플릿을 사용하여 POST 요청 전송
        Wallet wallet = restTemplate.postForObject(BLOCK_SERVER_URL+"/wallet", requestEntity, Wallet.class);

        walletRepository.save(wallet);
        userEntity.setWalletAddress(wallet.getAddress());

        return wallet;
    }


    public List<FileEntity> getNFTFiles() {
        return (List<FileEntity>) fileRepository.findAll();
    }

    public NFTResponse[] getOwnNFTs(CustomOAuth2User user) throws Exception {
        //user 찾기
        UserEntity userEntity = userRepository.findByUsername(user.getUserDto().getUsername());
        if (userEntity.getWalletAddress() == null) {
            return null;
        }

        RestTemplate restTemplate = new RestTemplate();
        // HTTP 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        NFTDTO dto = new NFTDTO();
        dto.setWalletAddress(userEntity.getWalletAddress());

        // HTTP 요청 본문에 객체 추가
        HttpEntity<NFTDTO> requestEntity = new HttpEntity<>(dto, headers);

        try {
            ResponseEntity<NFTResponse[]> response = restTemplate.postForEntity(BLOCK_SERVER_URL+"/nfts",requestEntity,NFTResponse[].class);
            NFTResponse[] body = response.getBody();
            for (NFTResponse r : body) {
                System.out.println(r);
            }
            return body;
        } catch (Exception e) {
            throw new Exception(e);
        }
    }
}
