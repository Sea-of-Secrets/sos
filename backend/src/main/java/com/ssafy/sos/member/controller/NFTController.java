package com.ssafy.sos.member.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/nft")
public class NFTController {

    @GetMapping
    @ResponseBody
    public ResponseEntity<?> nft() {
        return ResponseEntity.status(HttpStatus.OK).body("nft 관련 페이지 입니다. 권한이 있으시네요~");
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
