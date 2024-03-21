package com.ssafy.sos.member.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserNicknameRequest {
    private Long id;
    private String username;
}
