package com.ssafy.sos.member.controller;

import com.ssafy.sos.member.domain.AuthorizationCode;
import com.ssafy.sos.member.domain.Member;
import com.ssafy.sos.member.domain.MemberDto;
import com.ssafy.sos.member.service.MemberService;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.json.JsonParser;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.StringTokenizer;

@Controller
@CrossOrigin("*")
@RequestMapping("/members")
public class MemberController {

    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String KAKAO_CLIENT_ID;

    @Value("${spring.security.oauth2.client.registration.kakao.client-secret}")
    private String KAKAO_CLIENT_SECRET;

    @Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
    private String KAKAO_REDIRECT_URL;

    private final static String KAKAO_AUTH_URI = "https://kauth.kakao.com";
    private final static String KAKAO_API_URI = "https://kapi.kakao.com";
    private MemberService memberService;

    @Autowired
    public void MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/login")
    public void login(HttpServletResponse response) throws IOException {
        response.sendRedirect(KAKAO_AUTH_URI + "/oauth/authorize"
                + "?client_id=" + KAKAO_CLIENT_ID
                + "&redirect_uri=" + KAKAO_REDIRECT_URL
                + "&response_type=code"
        );
    }

    @GetMapping("/success")
    @ResponseBody
    public ResponseEntity<?> getAuthorizationCode(@RequestParam("code") String code) {
        //header 생성
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(HttpHeaders.CONTENT_TYPE, "application/x-www-form-urlencoded;charset=utf-8");

        //body 생성
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", KAKAO_CLIENT_ID);
        params.add("redirect_uri", KAKAO_REDIRECT_URL);
        params.add("code", code);

        //header + body
        HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<>(params, httpHeaders);

        //요청
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<AuthorizationCode> response = restTemplate.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                httpEntity,
                AuthorizationCode.class
        );

        AuthorizationCode authorizationCode = response.getBody();

        //액세스 토큰 토큰 검증
        boolean result = memberService.checkAuthorizationCode(authorizationCode.getAccess_token());

        //액세스 토큰 유효하지 않음
        if (!result) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        //카카오 유저 정보 가져오기
        Member member = memberService.getKakaoMemberInfo(authorizationCode.getId_token());
        MemberDto memberDto = new MemberDto();
        memberDto.setNickname(member.getNickname());
        memberDto.setPicture(member.getPicture());

        //이후 로직 처리
        return ResponseEntity.status(HttpStatus.OK)
                .header("access_token", authorizationCode.getAccess_token())
                .body(memberDto);
    }
}
