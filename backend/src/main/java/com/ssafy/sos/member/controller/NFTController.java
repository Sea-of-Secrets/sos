package com.ssafy.sos.member.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/nft")
public class NFTController {

    @GetMapping("/qrcode")
    public String qrcode(Model model) {

        return "Klip";
    }
}
