package com.ssafy.sos.global.error;

import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionAdvice {

    @ExceptionHandler({CustomException.class})
    public ResponseEntity<ErrorResponse> exceptionHandler(CustomException e) {
        ErrorResponse errorResponse = ErrorResponse.builder()
                .errorCode(e.getError().getCode())
                .errorMessage(e.getError().getMessage())
                .build();

        return ResponseEntity
                .status(e.getError().getStatus())
                .body(errorResponse);
    }

    @ExceptionHandler({Exception.class, RuntimeException.class, NullPointerException.class, IllegalArgumentException.class, /*AccessDeniedException.class*/})
    public ResponseEntity<ErrorResponse> exceptionHandler(Exception e) {
        String errorCode;
        String errorMessage;

        if(e instanceof NullPointerException) {
            errorCode = "400";
            errorMessage = "Null Pointer Exception";
        }
        else if (e instanceof IllegalArgumentException) {
            errorCode = "400";
            errorMessage = "Bad Request:" + e.getMessage();
        }
//        else if(e instanceof AccessDeniedException) {
//            errorCode = "403";
//            errorMessage = "Access Denied:" + e.getMessage();
//        }
        else {
            errorCode = "500";
            errorMessage = "Internal Server Error";
        }

        ErrorResponse errorResponse = ErrorResponse.builder()
                .errorCode(errorCode)
                .errorMessage(errorMessage)
                .build();

        return ResponseEntity
                .status(Integer.parseInt(errorCode))
                .body(errorResponse);
    }
}
