package com.ssafy.sos.global.S3;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.amazonaws.util.IOUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Objects;
import java.util.UUID;

@RequiredArgsConstructor
@Component
@Service
public class S3Uploader {

    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public String saveUploadFile(MultipartFile multipartFile) {

        ObjectMetadata objectMetadata = new ObjectMetadata();

        objectMetadata.setContentType(multipartFile.getContentType());

        objectMetadata.setContentLength(multipartFile.getSize());

        String fileName = createFileName(Objects.requireNonNull(multipartFile.getOriginalFilename()));

        try (InputStream inputStream = multipartFile.getInputStream()) {

            amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "이미지 업로드에 실패했습니다.");
        }

        return fileName;
    }

    public String getFilePath(String fileName) {
        return amazonS3.getUrl(bucket, fileName).toString();
    }

    public void deleteFile(String fileName) {
        amazonS3.deleteObject(new DeleteObjectRequest(bucket, fileName));
    }

    private String createFileName(String fileName) {
        try {
            String ext = fileName.substring(fileName.lastIndexOf("."));
            return UUID.randomUUID() + ext;
        } catch (StringIndexOutOfBoundsException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일(" + fileName + ") 입니다.");
        }
    }

    public byte[] downloadFile(String fileName) throws FileNotFoundException {

        validateFileExists(fileName);

        S3Object s3Object = amazonS3.getObject(bucket, fileName);
        S3ObjectInputStream s3ObjectContent = s3Object.getObjectContent();

        try {
            return IOUtils.toByteArray(s3ObjectContent);
        }catch (IOException e ){
            throw new FileNotFoundException("파일 다운로드 실패");
        }
    }

    private void validateFileExists(String fileName) throws FileNotFoundException {
        if(!amazonS3.doesObjectExist(bucket, fileName)) {
            throw new FileNotFoundException("파일이 존재하지 않습니다.");
        }
    }
}