package com.ssafy.sos.user.jwt;

import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Base64;
import java.util.StringTokenizer;

@SpringBootTest
class JWTUtilTest {

    @Autowired
    JWTUtil jwtUtil;

    @Test
    public void ttlTest() throws JSONException {

            long exp = jwtUtil.getExp("eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJuYW1lIjoibmF2ZXIgZ19OeE5qbjc0a2QwZ2REcGFmakVVcmFuQy03ZUZaSWVkMmkxVllzN3VDWSIsInJvbGUiOiJST0xFX1VTRVIiLCJpYXQiOjE3MTA4OTcwNjYsImV4cCI6MTcxMDg5NzY2Nn0.u76bR6D0r1wLa18_fzqw9InrGK5vf6rEo4fspWaizC0");

            // 현재 시간을 한국 표준시(KST)로 가져오기
            ZonedDateTime currentDateTime = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));
            long currentMillis = currentDateTime.toInstant().toEpochMilli();

            // exp 값 밀리초 단위로 변환
            long expInMillis = (exp * 1000) - currentMillis;
            System.out.println("Time until expiration (in milliseconds): " + expInMillis);
    }

    @Test
    public void jwtParsingTest() throws JSONException {
        String token = "eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJuYW1lIjoibmF2ZXIgZ19OeE5qbjc0a2QwZ2REcGFmakVVcmFuQy03ZUZaSWVkMmkxVllzN3VDWSIsInJvbGUiOiJST0xFX1VTRVIiLCJpYXQiOjE3MTA4OTcwNjYsImV4cCI6MTcxMDg5NzY2Nn0.u76bR6D0r1wLa18_fzqw9InrGK5vf6rEo4fspWaizC0";
        StringTokenizer st = new StringTokenizer(token, ".");
        String header = st.nextToken();
        String payload = st.nextToken();
        String signature = st.nextToken();

        Base64.Decoder decoder = Base64.getDecoder();
        byte[] decode = decoder.decode(payload);
        // String으로 변환
        String payloadString = new String(decode);

        // JSON 파싱
        JSONObject payloadJson = new JSONObject(payloadString);

        // exp 값 추출
        Long exp = payloadJson.getLong("exp");

        org.assertj.core.api.Assertions.assertThat(exp).isEqualTo(1710897666);
    }
}