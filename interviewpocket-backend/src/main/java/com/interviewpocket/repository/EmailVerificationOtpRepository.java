package com.interviewpocket.repository;

import com.interviewpocket.model.EmailVerificationOtp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmailVerificationOtpRepository extends JpaRepository<EmailVerificationOtp, Long> {
    Optional<EmailVerificationOtp> findByEmailIgnoreCase(String email);
    void deleteByEmailIgnoreCase(String email);
}

