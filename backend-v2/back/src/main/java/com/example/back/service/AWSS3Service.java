package com.example.back.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.example.back.exception.ErrorUploadingFileException;
import com.example.back.exception.MissingValuesException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class AWSS3Service implements IAWSS3Service{
    private static final Logger LOGGER = LogManager.getLogger(AWSS3Service.class);

    private static final String BUCKET_URL = "https://offroadrentals-images-e8-c7.s3.us-east-2.amazonaws.com/";
    private static final String FAILED_BECAUSE = "Failed because ";
    private static final String MISSING_FILE = "Missing file ";
    @Autowired
    private AmazonS3 amazonS3;

    @Value("${aws.s3.bucket}")
    private String bucketName;

    @Override
    public String uploadFile(MultipartFile file) throws ErrorUploadingFileException, MissingValuesException {

        if (file.isEmpty()) {
            throw new MissingValuesException(FAILED_BECAUSE + MISSING_FILE);
        }

        Path pathToImage = Paths.get("./image");

        File mainFile = new File(pathToImage + file.getOriginalFilename());

        try (FileOutputStream stream = new FileOutputStream(mainFile)) {
            stream.write(file.getBytes());

            String fileNameEnding = mainFile.getName().replaceAll("\\W", "_");

            String newFileName = System.currentTimeMillis() + "_" + fileNameEnding;
            LOGGER.info("Uploading file with name " + newFileName);
            PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, newFileName, mainFile);
            amazonS3.putObject(putObjectRequest);

            return (BUCKET_URL + newFileName);
        } catch (IOException e) {
            LOGGER.error(e.getMessage(), e);
            throw new ErrorUploadingFileException(e.getMessage());
        }
    }
}
