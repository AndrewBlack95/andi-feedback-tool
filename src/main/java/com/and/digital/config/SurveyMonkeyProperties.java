package com.and.digital.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@Component
@Data
@ConfigurationProperties(prefix="survey-monkey")
@PropertySource("file:/opt/applications/SurveyMonkey.properties")
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