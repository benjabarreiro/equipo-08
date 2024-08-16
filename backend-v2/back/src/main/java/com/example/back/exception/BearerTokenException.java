package com.example.back.exception;

public class BearerTokenException extends RuntimeException {

    public BearerTokenException(String message) {
        super(message);
    }

}