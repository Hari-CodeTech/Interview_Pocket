package com.interviewpocket.dto;

import java.util.List;

public class AuthResponse {
    private String token;
    private String tokenType = "Bearer";
    private Long id;
    private String username;
    private String email;
    private String fullName;
    private String role;
    private List<String> roles;

    public AuthResponse() {}

    public AuthResponse(String token, Long id, String username, String email, String fullName, List<String> roles) {
        this.token = token;
        this.tokenType = "Bearer";
        this.id = id;
        this.username = username;
        this.email = email;
        this.fullName = fullName;
        this.roles = roles;
        this.role = (roles != null && !roles.isEmpty()) ? roles.get(0) : "ROLE_USER";
    }

    public AuthResponse(String token, Long id, String username, String email, String fullName, String role) {
        this.token = token;
        this.tokenType = "Bearer";
        this.id = id;
        this.username = username;
        this.email = email;
        this.fullName = fullName;
        this.role = role != null ? role : "ROLE_USER";
        this.roles = List.of(this.role);
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getTokenType() { return tokenType; }
    public void setTokenType(String tokenType) { this.tokenType = tokenType; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getRole() { return role != null ? role : ((roles != null && !roles.isEmpty()) ? roles.get(0) : "ROLE_USER"); }
    public void setRole(String role) { this.role = role; }

    public List<String> getRoles() { return roles; }
    public void setRoles(List<String> roles) { this.roles = roles; }
}
