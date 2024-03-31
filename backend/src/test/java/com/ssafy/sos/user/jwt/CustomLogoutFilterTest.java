package com.ssafy.sos.user.jwt;

import com.ssafy.sos.user.repository.RefreshTokenRepository;
import io.lettuce.core.ScriptOutputType;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockFilterChain;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class CustomLogoutFilterTest {

    @Mock
    private JWTUtil jwtUtil;

    @Mock
    private RefreshTokenRepository refreshTokenRepository;

    @InjectMocks
    private CustomLogoutFilter customLogoutFilter;

    private MockHttpServletRequest request;
    private MockHttpServletResponse response;
    private MockFilterChain filterChain;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        request = new MockHttpServletRequest();
        response = new MockHttpServletResponse();
        filterChain = new MockFilterChain();
    }

    @Test
    @Transactional
    @Rollback(true)
    void testDoFilter_LogoutSuccess() throws Exception {
        // 설정: 리프레시 토큰이 유효하고, 쿠키에 저장되어 있으며, DB에도 존재하는 경우
        request.setServletPath("/logout");
        request.setMethod("POST");
        request.setCookies(new Cookie("refresh", "valid_refresh_token"));

        when(jwtUtil.getCategory("valid_refresh_token")).thenReturn("refresh");
        when(refreshTokenRepository.existsByToken("valid_refresh_token")).thenReturn(true);

        customLogoutFilter.doFilter(request, response, filterChain);

        // 검증
        assertEquals(HttpServletResponse.SC_OK, response.getStatus());
    }

    @Test
    void testDoFilter_InvalidMethod() throws Exception {
        // 설정: GET 메소드로 요청한 경우
        request.setServletPath("/logout");
        request.setMethod("GET");

        customLogoutFilter.doFilter(request, response, filterChain);

        // 검증
        assertNotEquals(HttpServletResponse.SC_BAD_REQUEST, response.getStatus());
    }
}