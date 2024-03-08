package com.ssafy.sos.global.error;

import lombok.Getter;

@Getter
public class CustomException extends RuntimeException {
    private final ExceptionEnum error;

    public CustomException(ExceptionEnum e) {
        super(e.getMessage());
        this.error = e;
    }
}