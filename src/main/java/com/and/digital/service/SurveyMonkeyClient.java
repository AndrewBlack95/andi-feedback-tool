package com.and.digital.service;

import com.and.digital.domain.config.SurveyMonkeyProperties;
import com.and.digital.domain.surveymonkey.SurveyMonkeyBearerTokenResponse;
import com.and.digital.exception.TokenExchangeException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@RequiredArgsConstructor
@Service
public class SurveyMonkeyClient {

    static final String AUTHORIZATION = "Authorization";
    private final RestTemplate restTemplate;
    private final SurveyMonkeyProperties properties;

    public String getLoginPage() {
        final String url = loginPageUrl();
        return restTemplate.getForObject(url, String.class);
    }

    public String exchangeShortLivedTokenForBearer(String shortLivedToken) {

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

        if (response.getStatusCode().equals(HttpStatus.OK) && response.getBody() != null) {
            final String bearerToken = response.getBody().getAccessToken();

            if (bearerToken != null && !bearerToken.isEmpty()) {
                return bearerToken;
            }
        }

        throw new TokenExchangeException("Could not exchange short lived token for bearer token");
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
