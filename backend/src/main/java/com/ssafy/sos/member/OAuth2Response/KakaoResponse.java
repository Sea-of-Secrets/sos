package com.ssafy.sos.member.OAuth2Response;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Map;

public class KakaoResponse implements OAuth2Response {
    private final Map<String, Object> attributes;

    public KakaoResponse(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    @Override
    public String getProvider() {

        return "kakao";
    }

    @Override
    public String getProviderId() {

        return attributes.get("id").toString();
    }

    @Override
    public String getEmail() {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, String> kakao_account = objectMapper.convertValue(attributes.get("kakao_account"), Map.class);

        return kakao_account.get("email");
    }


    @Override
    public String getName() {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, String> properties = objectMapper.convertValue(attributes.get("properties"), Map.class);

        return properties.get("nickname");
    }
}
