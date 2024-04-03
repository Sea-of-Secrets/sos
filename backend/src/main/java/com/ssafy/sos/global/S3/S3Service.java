package com.ssafy.sos.global.S3;

import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;

public interface S3Service {

    String saveUploadFile(MultipartFile multipartFile);

    String getFilePath(String fileName);

    void deleteFile(String fileName);

    String createFileName(String fileName);
    byte[] downloadFile(String fileName) throws FileNotFoundException;

    void validateFileExists(String fileName) throws FileNotFoundException;
}