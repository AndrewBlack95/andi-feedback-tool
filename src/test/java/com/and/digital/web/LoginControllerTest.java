package com.and.digital.web;

import com.and.digital.domain.config.SurveyMonkeyProperties;
import com.and.digital.service.SurveyMonkeyClient;
import org.hamcrest.CoreMatchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.hamcrest.CoreMatchers.*;
import static org.hamcrest.MatcherAssert.assertThat;

@ExtendWith(MockitoExtension.class)
class LoginControllerTest {

    @Mock private SurveyMonkeyClient surveyMonkeyClient; 
    private SurveyMonkeyProperties surveyMonkeyProperties;
    private LoginController controllerUnderTest;

    private static final String CLIENT_ID = "test-1234";
    private static final String CLIENT_SECRET = "secret-1234";

    @BeforeEach
    void setup() {
        surveyMonkeyProperties = new SurveyMonkeyProperties();
        surveyMonkeyProperties.setClientId(CLIENT_ID);
        surveyMonkeyProperties.setClientSecret(CLIENT_SECRET);

        controllerUnderTest = new LoginController(surveyMonkeyProperties, surveyMonkeyClient);
    }

    @Test
    void login_ReturnsLoginUrl() {

        ResponseEntity<String> result = controllerUnderTest.login();

        assertThat(result.getStatusCode(), is(HttpStatus.OK));
        assertThat(result.getBody(), is("OK"));
    }
}