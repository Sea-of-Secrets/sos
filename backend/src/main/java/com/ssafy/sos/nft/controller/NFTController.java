package com.ssafy.sos.nft.controller;

import com.ssafy.sos.nft.controller.domain.NFTDTO;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;

@Controller
@RequestMapping("/nft")
public class NFTController {

    @GetMapping
    public String nft() {
        return "NFT";
    }

    @PostMapping("/wallet")
    @ResponseBody
    public ResponseEntity<?> makeWallet() {

        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    @PostMapping("/upload")
    @ResponseBody
    public String handleFileUpload(@RequestParam("file") MultipartFile file,
                                   @RequestParam("title") String title,
                                   @RequestParam("description") String description) throws IOException {
        String fileData = Base64.getEncoder().encodeToString(file.getBytes());
        // 파일 처리 코드
        if (!file.isEmpty()) {

            // 여기에 파일을 저장하거나 처리하는 코드를 작성합니다.
            String fileName = file.getOriginalFilename();
            // 예를 들어, 파일 저장 로직을 추가할 수 있습니다.
        }

        NFTDTO nft = new NFTDTO(fileData, title, description);

        RestTemplate restTemplate = new RestTemplate();
        // HTTP 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // HTTP 요청 본문에 객체 추가
        HttpEntity<NFTDTO> requestEntity = new HttpEntity<>(nft, headers);
        System.out.println(requestEntity);
        // REST 템플릿을 사용하여 POST 요청 전송
        restTemplate.postForObject("http://localhost:4000/nft", requestEntity, Void.class);


        return "success"; // 업로드 성공 후 이동할 페이지를 지정합니다.
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
