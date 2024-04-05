package com.ssafy.sos.game.domain;

import com.ssafy.sos.user.domain.UserEntity;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Player {
    private String nickname; // 닉네임
    private UserEntity userInfo;
}
