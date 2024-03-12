package com.ssafy.sos.member.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.sos.member.domain.AuthorizationCode;
import com.ssafy.sos.member.domain.Member;
import com.ssafy.sos.member.domain.MemberDto;
import com.ssafy.sos.member.repository.MemberRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.AllArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
@AllArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final String secretKey = "jwtForSeaOfSecretsOfTeam710OfSamsungSoftwareAcademyForYouth";

    public void checkMember(Member member) {

    }

    public boolean checkAuthorizationCode(String accessToken) {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(HttpHeaders.CONTENT_TYPE, "application/x-www-form-urlencoded;charset=utf-8");
        httpHeaders.add("Authorization", "Bearer "+accessToken);
        HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<>(httpHeaders);

        //요청
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Object> response = restTemplate.exchange(
                "https://kapi.kakao.com/v1/user/access_token_info",
                HttpMethod.GET,
                httpEntity,
                Object.class
        );


        if (response.getStatusCode().equals(HttpStatus.OK)) {
            return true;
        }

        return false;
    }

    public String generateJwtToken(MemberDto memberDto) {
        Map<String, Object> payloads = new HashMap<>();
        Map<String, Object> headers = new HashMap<>();

        headers.put("alg", "HS256");
        headers.put("typ", "JWT");
        payloads.put("name", memberDto.getNickname());
        payloads.put("picture", memberDto.getPicture());
        payloads.put("sub", memberDto.getSub());


        return Jwts.builder()
                .setHeader(headers)
                .setClaims(payloads)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 60 * 1000 * 60))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public Member getKakaoMemberInfo(String idToken) {
        //검증 완료 되었으니 id_token 파싱
        StringTokenizer st = new StringTokenizer(idToken, ".");
        String header = st.nextToken();
        String payload = st.nextToken();
        String secret = st.nextToken();

        byte[] decoded = Base64.decodeBase64(payload);
        ObjectMapper objectMapper = new ObjectMapper();
        Member member = null;
        try {
            member = objectMapper.readValue(decoded, Member.class);
        } catch (Exception e) {
            e.printStackTrace();
        }

        Optional<Member> bySub = memberRepository.findBySub(member.getSub());
        if (bySub.isEmpty()) {
            memberRepository.save(member);
        }

        return member;
    }
}
