package com.and.digital.web;

import com.and.digital.repository.SurveyMonkeyRepository;
import com.and.digital.service.SurveyMonkeyService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class LoginControllerTest {

    @Mock private SurveyMonkeyService service;
    private LoginController controllerUnderTest;

    @BeforeEach
    void setup() {
        controllerUnderTest = new LoginController(service);
    }

    @Test
    void login_ReturnsLoginUrl() {

        final String loginPage = "some markup denoting a login page";

        when(service.getLoginPage())
                .thenReturn(loginPage);

        ResponseEntity<String> result = controllerUnderTest.login();

        assertThat(result.getStatusCode(), is(HttpStatus.OK));
        assertThat(result.getBody(), is(loginPage));
    }
}