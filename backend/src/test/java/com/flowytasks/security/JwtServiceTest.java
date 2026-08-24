package com.flowytasks.security;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class JwtServiceTest {

    private static final String SECRET =
            "VGhpcy1pcy1hLXRlc3Qtc2VjcmV0LWtleS10aGF0LWlzLWxvbmctZW5vdWdoLTEyMzQ1Ng==";

    @Test
    void createsAndReadsValidToken() {
        JwtService service = new JwtService(SECRET, 60_000);

        String token = service.createToken("person@example.com");

        assertThat(service.isValid(token)).isTrue();
        assertThat(service.extractEmail(token)).isEqualTo("person@example.com");
    }

    @Test
    void rejectsMalformedToken() {
        JwtService service = new JwtService(SECRET, 60_000);

        assertThat(service.isValid("not-a-jwt")).isFalse();
    }
}
