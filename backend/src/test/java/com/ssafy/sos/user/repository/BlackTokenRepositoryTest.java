package com.ssafy.sos.user.repository;

import com.ssafy.sos.user.jwt.BlackToken;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
class BlackTokenRepositoryTest {

    @Autowired
    private final BlackTokenRepository blackTokenRepository;

    BlackTokenRepositoryTest(BlackTokenRepository blackTokenRepository) {
        this.blackTokenRepository = blackTokenRepository;
    }

    @Test
    public void test() {
        BlackToken byToken = blackTokenRepository.findByToken("eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6InJlZnJlc2giLCJ1c2VybmFtZSI6Im5hdmVyIGdfTnhOam43NGtkMGdkRHBhZmpFVXJhbkMtN2VGWkllZDJpMVZZczd1Q1kiLCJyb2xlIjoiUk9MRV9VU0VSIiwiaWF0IjoxNzEwODM4MzI5LCJleHAiOjE3MTA5MjQ3Mjl9.TLFRbEJ22xKu8YmOazp_XIFpdCOlTFNp0k4VQaoiymo");
        System.out.println("byToken = " + byToken);

    }
}