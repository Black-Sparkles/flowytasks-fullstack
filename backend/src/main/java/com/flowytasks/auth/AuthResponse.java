package com.flowytasks.auth;

public record AuthResponse(
        String token,
        Long userId,
        String name,
        String email
) {}
