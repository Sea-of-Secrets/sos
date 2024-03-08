package com.ssafy.sos.global.error;

import lombok.Getter;
import lombok.ToString;
import org.springframework.http.HttpStatus;

@Getter
@ToString
public enum ExceptionEnum {

    // Member Error: 1000 ~
    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "CE1000", Message.MEMBER_NOT_FOUND);


    // Game Error: 2000 ~


    // Shop Error: 3000 ~


    private final HttpStatus status;
    private final String code;
    private final String message;

    ExceptionEnum(HttpStatus status, String code, String message) {
        this.status = status;
        this.code = code;
        this.message = message;
    }

    public interface Message{
        String MEMBER_NOT_FOUND = "회원을 찾을 수 없습니다.";
    }
}