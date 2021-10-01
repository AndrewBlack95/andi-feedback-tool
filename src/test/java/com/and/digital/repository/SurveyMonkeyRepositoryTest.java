package com.and.digital.repository;

import com.and.digital.common.TestData;
import com.and.digital.config.SurveyMonkeyProperties;
import com.and.digital.domain.surveymonkey.GetAllSurveysResponse;
import com.and.digital.domain.surveymonkey.SurveyMonkeyBearerTokenResponse;
import com.and.digital.exception.TokenExchangeException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import static com.and.digital.common.TestData.ERROR_MSG;
import static com.and.digital.common.TestData.getExpectedGetAllSurveysResponses;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class SurveyMonkeyRepositoryTest {

    private SurveyMonkeyRepository classUnderTest;

    @Mock
    private RestTemplate mockRestTemplate;
    private SurveyMonkeyProperties properties;

    @BeforeEach
    void setUp() {

        properties = new SurveyMonkeyProperties();
        properties.setClientId("some-client-id");
        properties.setClientSecret("some-client-secret");
        properties.setOAuthTokenUrl("https://some-url.com/token");
        properties.setSuccessfulLoginRedirectUri("https://some-rul.com/home");
        properties.setGrantType("authorization_code");

        classUnderTest = new SurveyMonkeyRepository(mockRestTemplate, properties);
    }

    @Test
    void getSurveys_responsesReturned_success() {
        when(mockRestTemplate.getForEntity("https://api.surveymonkey.com/v3/surveys/",
                GetAllSurveysResponse.class)).thenReturn(getExpectedGetAllSurveysResponses());

        assertEquals(TestData.getExpectedGetAllSurveysResponses().getBody(), classUnderTest.getAllSurveysResponse());
        verifyNoMoreInteractions(mockRestTemplate);
    }

    @Test
    void getSurveys_errorReturned_exceptionThrown() {
        when(mockRestTemplate.getForEntity("https://api.surveymonkey.com/v3/surveys/",
                GetAllSurveysResponse.class)).thenThrow(new RestClientException(ERROR_MSG));
        assertThrows(RestClientException.class, () -> classUnderTest.getAllSurveysResponse(), ERROR_MSG);
        verifyNoMoreInteractions(mockRestTemplate);

    }

    @Test
    void exchangeShortLivedTokenForBearer_exchangesToken() {

        final String shortLivedToken = "some-short-lived-token";
        final String bearerToken = "bearer-token";

        final SurveyMonkeyBearerTokenResponse expectedResponse = new SurveyMonkeyBearerTokenResponse();
        expectedResponse.setAccessToken(bearerToken);

        when(mockRestTemplate.exchange(eq(properties.getOAuthTokenUrl()), eq(HttpMethod.POST), any(HttpEntity.class), eq(SurveyMonkeyBearerTokenResponse.class)))
                .thenReturn(ResponseEntity.ok(expectedResponse));

        String methodResponse = classUnderTest.exchangeShortLivedTokenForBearer(shortLivedToken);

        assertEquals(methodResponse, bearerToken);
    }

    @Test
    void exchangeShortLivedTokenForBearer_ThrowsTokenExchangeExceptionIfBadResponse() {

        final String shortLivedToken = "some-short-lived-token";

        final SurveyMonkeyBearerTokenResponse expectedResponse = new SurveyMonkeyBearerTokenResponse();

        when(mockRestTemplate.exchange(eq(properties.getOAuthTokenUrl()), eq(HttpMethod.POST), any(HttpEntity.class), eq(SurveyMonkeyBearerTokenResponse.class)))
                .thenReturn(ResponseEntity.badRequest().body(expectedResponse));

        assertThrows(TokenExchangeException.class, () -> classUnderTest.exchangeShortLivedTokenForBearer(shortLivedToken));

    }
}