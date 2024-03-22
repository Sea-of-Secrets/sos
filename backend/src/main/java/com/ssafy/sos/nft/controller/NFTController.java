package com.ssafy.sos.nft.controller;

import com.ssafy.sos.member.domain.CustomOAuth2User;
import com.ssafy.sos.member.domain.UserDTO;
import com.ssafy.sos.member.domain.UserEntity;
import com.ssafy.sos.nft.domain.Wallet;
import com.ssafy.sos.nft.service.NFTService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Controller
@RequiredArgsConstructor
@RequestMapping("/nft")
public class NFTController {

    public final NFTService nftService;

    @GetMapping
    public String nft() {
        return "NFT";
    }

    @PostMapping("/wallet")
    @ResponseBody
    public ResponseEntity<?> makeWallet(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("로그인 해야함. 여길 어떻게 왔지?");
        }

        CustomOAuth2User user = (CustomOAuth2User) authentication.getPrincipal();

        Wallet wallet = nftService.makeWallet(user);
        if (wallet == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이미 지갑이 있습니다.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(wallet);
    }

    @PostMapping("/upload")
    @ResponseBody
    public ResponseEntity<?> handleFileUpload(@RequestParam("file") MultipartFile file,
                                   @RequestParam("title") String title,
                                   @RequestParam("description") String description) {
        // 파일이 비어 있는지 확인
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false);
        }

        try {
            long fildId = nftService.saveFile(file, title, description);
            return ResponseEntity.status(HttpStatus.OK).body(fildId);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(false);
        }
    }
//        String fileData = Base64.getEncoder().encodeToString(file.getBytes());
//        // 파일 처리 코드
//        if (!file.isEmpty()) {
//
//            // 여기에 파일을 저장하거나 처리하는 코드를 작성합니다.
//            String fileName = file.getOriginalFilename();
//            // 예를 들어, 파일 저장 로직을 추가할 수 있습니다.
//        }
//
//        NFTDTO nft = new NFTDTO(fileData, title, description);
//
//        RestTemplate restTemplate = new RestTemplate();
//        // HTTP 요청 헤더 설정
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//
//        // HTTP 요청 본문에 객체 추가
//        HttpEntity<NFTDTO> requestEntity = new HttpEntity<>(nft, headers);
//        System.out.println(requestEntity);
//        // REST 템플릿을 사용하여 POST 요청 전송
//        restTemplate.postForObject("http://localhost:4000/nft", requestEntity, Void.class);


    //TEST URL
    @PostMapping("/mint")
    @ResponseBody
    public String mintNFT(@AuthenticationPrincipal UserEntity user, @RequestParam("title") String title,
                          @RequestParam("description") String description) {
        String username = user.getUsername();


        try {
            nftService.mintingNFT(title, description);
            return "Success";
        } catch(IOException e) {
            e.printStackTrace();
            return "Fail";
        }
    }

    @GetMapping("/qrcode")
    public String qrcode(Model model) {

        return "Klip";
    }

//    @PostMapping("/success")
//    @ResponseBody
//    public ResponseEntity<?> connectSuccess(@RequestBody Wallet wallet) {
//
//        return ResponseEntity.status(HttpStatus.OK).body(wallet);
//    }

}
