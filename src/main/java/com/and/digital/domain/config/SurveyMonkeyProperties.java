package com.and.digital.domain.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties(prefix="survey-monkey")
public class SurveyMonkeyProperties {
    private String clientId;
    private String clientSecret;
    private String oAuthUrl;
    private String loginResponseType;
    private String loginRedirectUri;
    private String oAuthTokenUrl;
    private String successfulLoginRedirectUri;
    private String grantType;
    private String getSurveysUrl;
}