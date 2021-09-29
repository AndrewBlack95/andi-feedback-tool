package com.and.digital.service;

import com.and.digital.domain.config.SurveyMonkeyProperties;
import com.and.digital.domain.surveymonkey.SurveyMonkeyBearerTokenResponse;
import com.and.digital.exception.TokenExchangeException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

import static com.and.digital.service.SurveyMonkeyClient.AUTHORIZATION;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SurveyMonkeyClientTest {

    @Mock private RestTemplate restTemplate;
    private SurveyMonkeyProperties properties;
    private SurveyMonkeyClient clientUnderTest;

    @BeforeEach
    void setUp() {

        properties = new SurveyMonkeyProperties();
        properties.setClientId("some-client-id");
        properties.setClientSecret("some-client-secret");
        properties.setOAuthTokenUrl("https://some-url.com/token");
        properties.setSuccessfulLoginRedirectUri("https://some-rul.com/home");
        properties.setGrantType("authorization_code");

        clientUnderTest = new SurveyMonkeyClient(restTemplate, properties);
    }

    @Test
    void exchangeShortLivedTokenForBearer_exchangesToken() {

        final String shortLivedToken = "some-short-lived-token";
        final String bearerToken = "bearer-token";

        final SurveyMonkeyBearerTokenResponse expectedResponse = new SurveyMonkeyBearerTokenResponse();
        expectedResponse.setAccessToken(bearerToken);

        when(restTemplate.exchange(eq(properties.getOAuthTokenUrl()), eq(HttpMethod.POST), any(HttpEntity.class), eq(SurveyMonkeyBearerTokenResponse.class)))
                .thenReturn(ResponseEntity.ok(expectedResponse));

        String methodResponse = clientUnderTest.exchangeShortLivedTokenForBearer(shortLivedToken);

        assertEquals(methodResponse, bearerToken);
    }

    @Test
    void exchangeShortLivedTokenForBearer_ThrowsTokenExchangeExceptionIfBadResponse() {

        final String shortLivedToken = "some-short-lived-token";

        final SurveyMonkeyBearerTokenResponse expectedResponse = new SurveyMonkeyBearerTokenResponse();

        when(restTemplate.exchange(eq(properties.getOAuthTokenUrl()), eq(HttpMethod.POST), any(HttpEntity.class), eq(SurveyMonkeyBearerTokenResponse.class)))
                .thenReturn(ResponseEntity.badRequest().body(expectedResponse));

        assertThrows(TokenExchangeException.class, () -> clientUnderTest.exchangeShortLivedTokenForBearer(shortLivedToken));

    }
}