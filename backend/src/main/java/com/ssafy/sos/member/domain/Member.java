package com.ssafy.sos.member.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Member {
    /*
        "aud": "52d077cf5e47ef46b0bedeb883a86a15",
        "sub": "3383685573", -> 회원번호
        "auth_time": 1710134215,
        "iss": "https://kauth.kakao.com",
        "nickname": "이주연",
        "exp": 1710155815,
        "iat": 1710134215,
        "picture": "http://t1.kakaocdn.net/account_images/default_profile.jpeg.twg.thumb.R110x110"
     */
    private String aud;
    @Id
    private String sub;
    private long auth_time;
    private String iss;
    private String nickname;
    private int exp;
    private int iat;
    private String picture;
}
