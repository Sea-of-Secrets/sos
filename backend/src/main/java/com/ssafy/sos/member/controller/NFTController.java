package com.ssafy.sos.member.controller;

import com.ssafy.sos.member.domain.Wallet;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/nft")
public class NFTController {

    @GetMapping("/qrcode")
    public String qrcode(Model model) {

        return "Klip";
    }

    @PostMapping("/success")
    @ResponseBody
    public ResponseEntity<?> connectSuccess(@RequestBody Wallet wallet) {
        System.out.println(wallet);
        return ResponseEntity.status(HttpStatus.OK).body(wallet);
    }

}
