package com.ssafy.sos.nft.controller;

import com.ssafy.sos.user.domain.CustomOAuth2User;
import com.ssafy.sos.nft.domain.FileEntity;
import com.ssafy.sos.nft.domain.NFTResponse;
import com.ssafy.sos.nft.domain.Wallet;
import com.ssafy.sos.nft.service.NFTService;
import com.ssafy.sos.user.domain.UserEntity;
import com.ssafy.sos.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.checkerframework.checker.units.qual.A;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/nft")
public class NFTController {
    public final UserService userService;
    public final NFTService nftService;

    @GetMapping("/wallet")
    public ResponseEntity<?> getNFTs(Authentication authentication) {
        CustomOAuth2User user = (CustomOAuth2User) authentication.getPrincipal();
         try {
             NFTResponse[] ownNFTs = nftService.getOwnNFTs(user);
             return ResponseEntity.status(HttpStatus.OK).body(ownNFTs);
         } catch(Exception e) {
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
         }
    }

    @GetMapping("/wallet/info")
    public ResponseEntity<?> getWalletInfo(Authentication authentication) {
        CustomOAuth2User user = (CustomOAuth2User) authentication.getPrincipal();

        UserEntity userInfo = userService.getUserInfo(user);
        if (userInfo.getWalletAddress() == null) {
            return ResponseEntity.status(HttpStatus.OK).body("지갑을 만드세요.");
        }

        Wallet wallet = nftService.getWalletInfo(userInfo.getWalletAddress());

        return ResponseEntity.status(HttpStatus.OK).body(wallet);
    }


    @PostMapping("/wallet")
    public ResponseEntity<?> makeWallet(Authentication authentication) {
        CustomOAuth2User user = (CustomOAuth2User) authentication.getPrincipal();

        Wallet wallet = nftService.makeWallet(user);
        if (wallet == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이미 지갑이 있습니다.");
        }
        return ResponseEntity.status(HttpStatus.OK).body(wallet);
    }

    @PatchMapping("/wallet")
    public ResponseEntity<?> addWallet(Authentication authentication, @RequestBody  Map<String, String> wallet) {
        CustomOAuth2User user = (CustomOAuth2User) authentication.getPrincipal();

        String address = wallet.get("walletAddress");
        System.out.println(address);
        if (address == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("올바르지 못한 지갑 주소입니다.");
        }

        if (address.length() < 27 || address.length() > 50) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("올바르지 못한 지갑 주소 길이입니다.");
        }

        UserEntity userInfo = userService.getUserInfo(user);

        String s = userService.updateWallet(userInfo, address);
        return ResponseEntity.status(HttpStatus.OK).body(s);
    }

//    @PostMapping("/upload")
//    @ResponseBody
//    public ResponseEntity<?> handleFileUpload(@RequestParam("file") MultipartFile file,
//                                   @RequestParam("title") String title,
//                                   @RequestParam("description") String description) {
//        // 파일이 비어 있는지 확인
//        if (file.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false);
//        }
//
//        try {
//            long fildId = nftService.saveFile(file, title, description);
//            return ResponseEntity.status(HttpStatus.OK).body(fildId);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(false);
//        }
//    }

    //TEST URL
//    @PostMapping("/mint")
//    @ResponseBody
//    public ResponseEntity<?> mintNFT(Authentication authentication, @RequestParam("fileId") String fileId) {
//        if (authentication == null) {
//            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("로그인 해야함. 여길 어떻게 왔지?");
//        }
//
//        CustomOAuth2User user = (CustomOAuth2User) authentication.getPrincipal();
//
//        try {
//            nftService.mintingNFT(user, fileId);
//            return ResponseEntity.status(HttpStatus.OK).body("success");
//        }  catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
//        }
//        return null;
//    }

//    @GetMapping("/files")
//    public ResponseEntity<?> getNFTFiles() {
//        try {
//            List<FileEntity> nftFile = nftService.getNFTFiles();
//            return ResponseEntity.status(HttpStatus.OK).body(nftFile);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
//        }
//    }

//    @GetMapping("/qrcode")
//    public String qrcode(Model model) {
//        return "Klip";
//    }
}
