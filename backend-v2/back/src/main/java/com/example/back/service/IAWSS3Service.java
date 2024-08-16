package com.example.back.service;

import com.example.back.exception.ErrorUploadingFileException;
import com.example.back.exception.MissingValuesException;
import org.springframework.web.multipart.MultipartFile;

public interface IAWSS3Service {
    String uploadFile(MultipartFile file) throws ErrorUploadingFileException, MissingValuesException;
}
