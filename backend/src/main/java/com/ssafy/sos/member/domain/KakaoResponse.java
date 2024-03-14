package com.ssafy.sos.member.domain;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.HashMap;
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
        return null;
    }

    @Override
    public String getName() {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, String> properties = objectMapper.convertValue(attributes.get("properties"), Map.class);

        return properties.get("nickname");
    }
}
