package com.ssafy.sos.member.jwt;

import com.ssafy.sos.member.domain.CustomOAuth2User;
import com.ssafy.sos.member.domain.UserDTO;
import com.ssafy.sos.member.domain.UserEntity;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.checkerframework.checker.units.qual.C;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.PrintWriter;

public class JWTFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;

    public JWTFilter(JWTUtil jwtUtil) {

        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException, IOException {
        String accessToken = request.getHeader("access");

        if (accessToken == null) {
            filterChain.doFilter(request, response);
            return;
        }

        //access 토큰 만료 여부 확인
        try {
            jwtUtil.isExpired(accessToken);

            String category = jwtUtil.getCategory(accessToken);

            //이상한 토큰일 경우
            if (!category.equals("access")) {

                PrintWriter writer = response.getWriter();
                writer.print("invalid access token");

                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }

            //정상 토큰일 경우
            String username = jwtUtil.getUsername(accessToken);
            String role = jwtUtil.getRole(accessToken);

            UserDTO userDTO = new UserDTO();
            userDTO.setUsername(username);
            userDTO.setRole(role);
            CustomOAuth2User userDto = new CustomOAuth2User(userDTO);

            Authentication authToken = new UsernamePasswordAuthenticationToken(userDto, null, userDto.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authToken);

            filterChain.doFilter(request, response);
        } catch(ExpiredJwtException e) {
            //토큰 만료의 경우

            //refresh토큰 확인
            //cookie들을 불러온 뒤 Authorization Key에 담긴 쿠키를 찾음
            String refresh = null;
            Cookie[] cookies = request.getCookies();
            if (cookies == null) {
                System.out.println("access은 이상하고, refresh는 없음. 로그인 해야함");
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.sendRedirect("http://localhost:3000");

                return;
            }

            for (Cookie cookie : cookies) {

                System.out.println(cookie.getName());
                if (cookie.getName().equals("refresh")) {

                    refresh = cookie.getValue();
                }
            }

            //refresh토큰  검증
            if (refresh == null) {
                //access가 이상한데 refresh도 없어?
                PrintWriter writer = response.getWriter();
                writer.print("do login");
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.sendRedirect("http://localhost:3000");

                System.out.println("access은 이상하고, refresh는 없음. 로그인 해야함");

                //조건이 해당되면 메소드 종료 (필수)
                return;
            }

            //토큰 소멸 시간 검증
            if (jwtUtil.isExpired(refresh)) {
                //refresh 만료의 경우
                PrintWriter writer = response.getWriter();
                writer.print("do login");
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.sendRedirect("http://localhost:3000");

                System.out.println("refresh만료. 로그인 해야함");

                //조건이 해당되면 메소드 종료 (필수)
                return;
            }

            System.out.println("여기냐?");
            //재발급 로직
            String username = jwtUtil.getUsername(refresh);
            String role = jwtUtil.getRole(refresh);

            //make new JWT
            String newAccess = jwtUtil.createJwt("access", username, role, 600000L);
            String newRefresh = jwtUtil.createJwt("refresh", username, role, 86400000L);

            //response
            response.setHeader("access", newAccess);
            Cookie refreshCookie = new Cookie("refresh", newRefresh);
            refreshCookie.setMaxAge(24*60*60);
            //cookie.setSecure(true);
            refreshCookie.setPath("/");
            refreshCookie.setHttpOnly(true);

            System.out.println("newRefresh = " + newRefresh);
            response.addCookie(refreshCookie);

            UserDTO userDTO = new UserDTO();
            userDTO.setUsername(username);
            userDTO.setRole(role);
            CustomOAuth2User userDto = new CustomOAuth2User(userDTO);

            Authentication authToken = new UsernamePasswordAuthenticationToken(userDto, null, userDto.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authToken);

            filterChain.doFilter(request, response);
        }
    }
}
