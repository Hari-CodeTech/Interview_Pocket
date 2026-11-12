package com.interviewpocket.rag;

public class RagApiException extends RuntimeException {
    private final int statusCode;

    public RagApiException(String message) {
        super(message);
        this.statusCode = 503;
    }

    public RagApiException(String message, int statusCode) {
        super(message);
        this.statusCode = statusCode;
    }

    public RagApiException(String message, Throwable cause) {
        super(message, cause);
        this.statusCode = 503;
    }

    public int getStatusCode() {
        return statusCode;
    }
}

