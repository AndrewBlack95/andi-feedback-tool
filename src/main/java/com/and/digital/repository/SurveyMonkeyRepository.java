package com.and.digital.repository;

import com.and.digital.config.SurveyMonkeyProperties;
import com.and.digital.domain.surveymonkey.dao.GetAllSurveysResponse;
import com.and.digital.domain.surveymonkey.dao.GetSurveyResponses;
import com.and.digital.domain.surveymonkey.dao.SurveyDetails;
import com.and.digital.domain.surveymonkey.dao.SurveyMonkeyBearerTokenResponse;
import com.and.digital.exception.TokenExchangeException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Repository;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.function.Supplier;

import static java.util.Objects.nonNull;

@Slf4j
@RequiredArgsConstructor
@Repository
public class SurveyMonkeyRepository {

    private final RestTemplate restTemplate;
    private final SurveyMonkeyProperties properties;

    public GetAllSurveysResponse getAllSurveysResponse() {
        return handleRestRequest(() -> restTemplate.getForEntity(properties.getGetSurveysUri(), GetAllSurveysResponse.class));
    }

    public SurveyDetails getSurveyDetails(final String id) {
        return handleRestRequest(() -> restTemplate.getForEntity(String.format(properties.getGetSurveyDetailsUri(), id), SurveyDetails.class));
    }

    public GetSurveyResponses getIndividualSurveyResponses(final String id) {
        return handleRestRequest(() -> restTemplate.getForEntity(String.format(properties.getGetSurveyResponsesUri(), id), GetSurveyResponses.class));
    }

    public String exchangeShortLivedTokenForBearer(final String shortLivedToken) {

        final HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        final MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("client_id", properties.getClientId());
        map.add("client_secret", properties.getClientSecret());
        map.add("code", shortLivedToken);
        map.add("redirect_uri", properties.getSuccessfulLoginRedirectUri());
        map.add("grant_type", properties.getGrantType());

        final HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(map, headers);

        final SurveyMonkeyBearerTokenResponse response = handleRestRequest(() -> restTemplate.exchange(properties.getOAuthTokenUrl(), HttpMethod.POST, entity, SurveyMonkeyBearerTokenResponse.class));

        if (nonNull(response)) {
            final String bearerToken = response.getAccessToken();

            if (bearerToken != null && !bearerToken.isEmpty()) {
                return bearerToken;
            }
        }

        throw new TokenExchangeException("Could not exchange short lived token for bearer token");
    }

    public <T> T handleRestRequest(final Supplier<ResponseEntity<T>> restFunction) {
        try {
            final ResponseEntity<T> surveys = restFunction.get();
            return surveys.getBody();
        } catch (final RestClientException e) {
            log.error("Exception from Survey Monkey:", e);
            throw e;
        }
    }

    public String getLoginPage() {
        final String url = loginPageUrl();
        return restTemplate.getForObject(url, String.class);
    }

    private String loginPageUrl() {
        return new StringBuilder()
                .append(properties.getOAuthUrl())
                .append("?")
                .append(String.format("response_type=%s", properties.getLoginResponseType()))
                .append("&")
                .append(String.format("client_id=%s", properties.getClientId()))
                .append("&")
                .append(String.format("redirect_uri=%s", properties.getLoginRedirectUri()))
                .toString();
    }
}