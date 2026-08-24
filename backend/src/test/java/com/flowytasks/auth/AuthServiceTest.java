package com.flowytasks.auth;

import com.flowytasks.security.JwtService;
import com.flowytasks.user.AppUser;
import com.flowytasks.user.AppUserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private AppUserRepository users;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    private AuthService service;

    @BeforeEach
    void setUp() {
        service = new AuthService(users, passwordEncoder, jwtService);
    }

    @Test
    void registerHashesPasswordAndNormalizesEmail() {
        when(users.existsByEmailIgnoreCase("person@example.com")).thenReturn(false);
        when(passwordEncoder.encode("supersecret")).thenReturn("hashed-password");
        when(jwtService.createToken("person@example.com")).thenReturn("token");

        AppUser saved = new AppUser();
        saved.setName("Taylor");
        saved.setEmail("person@example.com");
        saved.setPasswordHash("hashed-password");

        when(users.save(any(AppUser.class))).thenReturn(saved);

        AuthResponse response = service.register(
                new RegisterRequest(" Taylor ", " PERSON@Example.com ", "supersecret")
        );

        ArgumentCaptor<AppUser> captor = ArgumentCaptor.forClass(AppUser.class);
        verify(users).save(captor.capture());

        AppUser value = captor.getValue();
        assertThat(value.getName()).isEqualTo("Taylor");
        assertThat(value.getEmail()).isEqualTo("person@example.com");
        assertThat(value.getPasswordHash()).isEqualTo("hashed-password");
        assertThat(response.token()).isEqualTo("token");
    }

    @Test
    void registerRejectsDuplicateEmail() {
        when(users.existsByEmailIgnoreCase("person@example.com")).thenReturn(true);

        assertThatThrownBy(() ->
                service.register(
                        new RegisterRequest("Taylor", "person@example.com", "supersecret")
                )
        )
                .isInstanceOf(AuthException.class)
                .hasMessage("An account with that email already exists");

        verify(users, never()).save(any());
    }

    @Test
    void loginRejectsWrongPassword() {
        AppUser user = new AppUser();
        user.setEmail("person@example.com");
        user.setPasswordHash("stored-hash");

        when(users.findByEmailIgnoreCase("person@example.com"))
                .thenReturn(Optional.of(user));
        when(passwordEncoder.matches("wrong-password", "stored-hash"))
                .thenReturn(false);

        assertThatThrownBy(() ->
                service.login(new LoginRequest("person@example.com", "wrong-password"))
        )
                .isInstanceOf(AuthException.class)
                .hasMessage("Invalid email or password");
    }
}
