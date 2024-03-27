package com.ssafy.sos.nft.controller;

import com.ssafy.sos.member.domain.CustomOAuth2User;
import com.ssafy.sos.member.domain.UserDTO;
import com.ssafy.sos.member.domain.UserEntity;
import com.ssafy.sos.nft.domain.FileEntity;
import com.ssafy.sos.nft.domain.NFTResponse;
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
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/nft")
public class NFTController {

    public final NFTService nftService;

    @GetMapping("/wallet")
    @ResponseBody
    public ResponseEntity<?> getNFTs(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("로그인 해야함. 여길 어떻게 왔지?");
        }

        CustomOAuth2User user = (CustomOAuth2User) authentication.getPrincipal();
         try {
             NFTResponse[] ownNFTs = nftService.getOwnNFTs(user);
             return ResponseEntity.status(HttpStatus.OK).body(ownNFTs);
         } catch(Exception e) {
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
         }

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

    @GetMapping("/upload")
    public String uploadPage() {
        return "NFT";
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

    //TEST URL
    @PostMapping("/mint")
    @ResponseBody
    public ResponseEntity<?> mintNFT(Authentication authentication, @RequestParam("fileId") String fileId) {
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("로그인 해야함. 여길 어떻게 왔지?");
        }

        CustomOAuth2User user = (CustomOAuth2User) authentication.getPrincipal();

        try {
            nftService.mintingNFT(user, fileId);
            return ResponseEntity.status(HttpStatus.OK).body("success");
        }  catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/files")
    public ResponseEntity<?> getNFTFiles() {
        try {
            List<FileEntity> nftFile = nftService.getNFTFiles();
            return ResponseEntity.status(HttpStatus.OK).body(nftFile);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/qrcode")
    public String qrcode(Model model) {
        return "Klip";
    }
}
