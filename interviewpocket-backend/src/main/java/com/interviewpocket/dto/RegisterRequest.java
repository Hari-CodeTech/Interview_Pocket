package com.interviewpocket.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class RegisterRequest {
    private String username;

    @NotBlank(message = "Email is required")
    @Email(message = "Please provide a valid email address")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, max = 50, message = "Password must be between 6 and 50 characters")
    private String password;

    @NotBlank(message = "Full Name is required")
    private String fullName;

    private String learningLevel;
    private String primaryTechnologies;
    private String preparationGoal;

    public RegisterRequest() {}

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getLearningLevel() { return learningLevel; }
    public void setLearningLevel(String learningLevel) { this.learningLevel = learningLevel; }

    public String getPrimaryTechnologies() { return primaryTechnologies; }
    public void setPrimaryTechnologies(String primaryTechnologies) { this.primaryTechnologies = primaryTechnologies; }

    public String getPreparationGoal() { return preparationGoal; }
    public void setPreparationGoal(String preparationGoal) { this.preparationGoal = preparationGoal; }
}
