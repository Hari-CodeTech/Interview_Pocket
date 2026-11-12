package com.interviewpocket.service;

import com.interviewpocket.dto.AuthRequest;
import com.interviewpocket.dto.AuthResponse;
import com.interviewpocket.dto.RegisterRequest;
import com.interviewpocket.dto.UserDto;
import com.interviewpocket.model.Role;
import com.interviewpocket.model.User;
import com.interviewpocket.repository.RoleRepository;
import com.interviewpocket.repository.UserRepository;
import com.interviewpocket.security.CustomUserDetails;
import com.interviewpocket.security.JwtTokenProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final SecureRandom secureRandom = new SecureRandom();

    public AuthService(AuthenticationManager authenticationManager,
                       UserRepository userRepository,
                       RoleRepository roleRepository,
                       PasswordEncoder passwordEncoder,
                       JwtTokenProvider tokenProvider) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    /**
     * Authenticates user using either their Email Address OR their Username.
     */
    public AuthResponse login(AuthRequest request) {
        String identifier = request.getEmail();
        if (identifier == null || identifier.trim().isEmpty()) {
            identifier = request.getUsername();
        }

        if (identifier == null || identifier.trim().isEmpty()) {
            throw new IllegalArgumentException("Email address or username is required.");
        }
        if (request.getPassword() == null || request.getPassword().isEmpty()) {
            throw new IllegalArgumentException("Password is required.");
        }

        identifier = identifier.trim().toLowerCase();

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(identifier, request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        User user = userDetails.getUser();

        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        String primaryRole = user.getRole() != null ? user.getRole() : (!roles.isEmpty() ? roles.get(0) : "ROLE_USER");

        return new AuthResponse(
                jwt,
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getFullName(),
                primaryRole
        );
    }

    /**
     * Registers a new user with BCrypt password hashing and default ROLE_USER.
     */
    public AuthResponse register(RegisterRequest request) {
        if (request.getFullName() == null || request.getFullName().trim().isEmpty()) {
            throw new IllegalArgumentException("Full Name is required.");
        }

        String email = request.getEmail() != null ? request.getEmail().trim().toLowerCase() : "";
        if (email.isEmpty() || !email.matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            throw new IllegalArgumentException("Please provide a valid email address.");
        }

        if (request.getPassword() == null || request.getPassword().length() < 6) {
            throw new IllegalArgumentException("Password must be at least 6 characters long.");
        }

        // Email uniqueness validation
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("An account with this email address already exists. Please sign in.");
        }

        // Generate username
        String username = request.getUsername();
        if (username == null || username.trim().isEmpty()) {
            String prefix = email.split("@")[0].replaceAll("[^a-zA-Z0-9_]", "");
            username = prefix + "_" + (100 + secureRandom.nextInt(900));
        } else {
            username = username.trim().toLowerCase();
        }

        if (userRepository.existsByUsername(username)) {
            username = username + "_" + (100 + secureRandom.nextInt(900));
        }

        // Create User entity with BCrypt password and default ROLE_USER
        User user = new User(
                username,
                email,
                passwordEncoder.encode(request.getPassword()),
                request.getFullName().trim()
        );
        user.setRole("ROLE_USER"); // Public registration is strictly ROLE_USER

        Role userRole = roleRepository.findByName("ROLE_USER")
                .orElseGet(() -> roleRepository.save(new Role("ROLE_USER")));
        user.setRoles(Set.of(userRole));

        user = userRepository.save(user);

        logger.info("Successfully registered user id={}, email={}, role={}", user.getId(), user.getEmail(), user.getRole());

        // Generate JWT token for immediate access
        String jwt = tokenProvider.generateTokenFromUsername(user.getUsername());

        return new AuthResponse(
                jwt,
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getFullName(),
                "ROLE_USER"
        );
    }

    /**
     * Retrieves authenticated user's profile details without exposing password or sensitive info.
     */
    @Transactional(readOnly = true)
    public UserDto getUserProfile(String identifier) {
        User user = userRepository.findByUsername(identifier)
                .or(() -> userRepository.findByEmail(identifier))
                .orElseThrow(() -> new UsernameNotFoundException("User not found with identifier: " + identifier));

        return new UserDto(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole(),
                user.getCreatedAt()
        );
    }
}
