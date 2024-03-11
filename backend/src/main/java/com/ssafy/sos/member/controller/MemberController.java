package com.ssafy.sos.member.controller;

import com.ssafy.sos.member.domain.AuthorizationCode;
import com.ssafy.sos.member.domain.Member;
import com.ssafy.sos.member.service.MemberService;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
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

    @Value("${kakao.client.id}")
    private String KAKAO_CLIENT_ID;

    @Value("${kakao.client.secret}")
    private String KAKAO_CLIENT_SECRET;

    @Value("${kakao.redirect.url}")
    private String KAKAO_REDIRECT_URL;

    private final static String KAKAO_AUTH_URI = "https://kauth.kakao.com";
    private final static String KAKAO_API_URI = "https://kapi.kakao.com";
    private org.json.simple.parser.JSONParser jsonParser;
    private MemberService memberService;

    @Autowired
    public void MemberController(MemberService memberService) {
        this.memberService = memberService;
    }
    @PostConstruct
    public void init() {
        jsonParser = new JSONParser();
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
    public ResponseEntity<?> getAuthorizationCode(@RequestParam("code") String code) throws ParseException {
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
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        //카카오 유저 정보 가져오기
        Member member = memberService.getKakaoMember(authorizationCode.getId_token());
        System.out.println(member);

        //이후 로직 처리
        return response;
    }
}
