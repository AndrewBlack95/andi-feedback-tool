package com.and.digital.repository;

import com.and.digital.config.SurveyMonkeyProperties;
import com.and.digital.domain.surveymonkey.GetAllSurveysResponse;
import com.and.digital.domain.surveymonkey.SurveyMonkeyBearerTokenResponse;
import com.and.digital.exception.TokenExchangeException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Repository;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Slf4j
@RequiredArgsConstructor
@Repository
public class SurveyMonkeyRepository {

    private final RestTemplate restTemplate;
    private final SurveyMonkeyProperties properties;

    public GetAllSurveysResponse getAllSurveysResponse() {
        try {
            final ResponseEntity<GetAllSurveysResponse> surveys = restTemplate.getForEntity("https://dummy/api/", GetAllSurveysResponse.class);
            return surveys.getBody();
        } catch (final RestClientException e) {
            log.error("Exception from Survey Monkey:", e);
            throw e;
        }
    }

    public String exchangeShortLivedTokenForBearer(final String shortLivedToken) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("client_id", properties.getClientId());
        map.add("client_secret", properties.getClientSecret());
        map.add("code", shortLivedToken);
        map.add("redirect_uri", properties.getSuccessfulLoginRedirectUri());
        map.add("grant_type", properties.getGrantType());

        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(map, headers);

        ResponseEntity<SurveyMonkeyBearerTokenResponse> response = restTemplate.exchange(properties.getOAuthTokenUrl(), HttpMethod.POST, entity, SurveyMonkeyBearerTokenResponse.class);

        if (hasOKResponseWithBody(response)) {
            final String bearerToken = response.getBody().getAccessToken();

            if (bearerToken != null && !bearerToken.isEmpty()) {
                return bearerToken;
            }
        }

        throw new TokenExchangeException("Could not exchange short lived token for bearer token");
    }

    public String buildLoginURL() {
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

    private boolean hasOKResponseWithBody(ResponseEntity<SurveyMonkeyBearerTokenResponse> response) {
        return response.getStatusCode().equals(HttpStatus.OK) && response.getBody() != null;
    }
}
