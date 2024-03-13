package com.ssafy.sos.member.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.sos.member.OAuth2RequestProcessor;
import com.ssafy.sos.member.OAuth2RequestProcessorFactory;
import com.ssafy.sos.member.domain.*;
import com.ssafy.sos.member.repository.MemberRepository;
import com.ssafy.sos.member.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.codec.binary.Base64;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Slf4j
@Service
@AllArgsConstructor
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    private final MemberRepository memberRepository;
    private final UserRepository userRepository;
    private final OAuth2RequestProcessorFactory oAuth2RequestProcessorFactory;

    private final String secretKey = "jwtForSeaOfSecretsOfTeam710OfSamsungSoftwareAcademyForYouth";

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        System.out.println("CustomOAuth2UserService.loadUser");
        log.trace("1. OAuth2 로그인에 성공했습니다.");
        log.trace("2. OAuth2 리소스 서버로부터 유저 정보를 가져옵니다.");
        OAuth2RequestProcessor oAuth2Parser = oAuth2RequestProcessorFactory.createOAuth2Processor(userRequest);

        return new DefaultOAuth2User(
                AuthorityUtils.NO_AUTHORITIES,
                oAuth2Parser.makeUserAttributes(),
                oAuth2Parser.loadUserNameAttributeName()
        );
//        OAuth2User oAuth2User = super.loadUser(userRequest);

//        System.out.println(oAuth2User);
//
//        return oAuth2User;
//        String registrationId = userRequest.getClientRegistration().getRegistrationId();
//        OAuth2Response oAuth2Response = null;
//        System.out.println("registrationId = " + registrationId);
//        if (registrationId.equals("kakao")) {
//            System.out.println("MemberService.loadUser");
//            oAuth2Response = new KakaoResponse(oAuth2User.getAttributes());
//        }
//        else if (registrationId.equals("google")) {
//
//        }
//        else {
//
//            return null;
//        }
//
//        //리소스 서버에서 발급 받은 정보로 사용자를 특정할 아이디값을 만듬
//        String username = oAuth2Response.getProvider()+" "+oAuth2Response.getProviderId();
//        UserEntity existData = userRepository.findByUsername(username);
//        System.out.println("ping");
//        if (existData == null) {
//
//            UserEntity userEntity = new UserEntity();
//            userEntity.setUsername(username);
//            userEntity.setEmail(oAuth2Response.getEmail());
//            userEntity.setName(oAuth2Response.getName());
//            userEntity.setRole("ROLE_USER");
//
//            UserEntity save = userRepository.save(userEntity);
//            System.out.println(save);
//
//            MemberDto memberDto = new MemberDto();
//            memberDto.setUsername(username);
//            memberDto.setName(oAuth2Response.getName());
//            memberDto.setRole("ROLE_USER");
//
//            return new CustomOAuth2User(memberDto);
//        }
//        else {
//
//            existData.setEmail(oAuth2Response.getEmail());
//            existData.setName(oAuth2Response.getName());
//
//            userRepository.save(existData);
//
//            MemberDto memberDto = new MemberDto();
//            memberDto.setUsername(existData.getUsername());
//            memberDto.setName(oAuth2Response.getName());
//            memberDto.setRole(existData.getRole());
//
//            return new CustomOAuth2User(memberDto);
//        }
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
