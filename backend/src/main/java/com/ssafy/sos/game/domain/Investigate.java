package com.ssafy.sos.game.domain;

import lombok.Data;
import java.util.HashMap;

@Data
public class Investigate {
    // 조사 선택 노드 성공, 실패 여부
    private boolean success;
    // 조사 가능 노드 번호 : 조사 했는지 여부
    private HashMap<Integer, Boolean> nodes;
}
