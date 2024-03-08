package com.ssafy.sos.global.error;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ErrorResponse {
    private String errorCode;
    private String errorMessage;

    @Builder
    private ErrorResponse(String errorCode, String errorMessage) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}
