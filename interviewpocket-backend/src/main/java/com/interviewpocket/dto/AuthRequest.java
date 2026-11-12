package com.interviewpocket.dto;

public class AuthRequest {
    private String email;
    private String username;
    private String password;

    public AuthRequest() {}

    public AuthRequest(String email, String password) {
        this.email = email;
        this.username = email;
        this.password = password;
    }

    public String getEmail() {
        return email != null && !email.isBlank() ? email : username;
    }

    public void setEmail(String email) {
        this.email = email;
        if (this.username == null) {
            this.username = email;
        }
    }

    public String getUsername() {
        return username != null && !username.isBlank() ? username : email;
    }

    public void setUsername(String username) {
        this.username = username;
        if (this.email == null) {
            this.email = username;
        }
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
