package com.and.digital.domain.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@ConfigurationProperties(prefix="survey-monkey")
@Component
public class SurveyMonkeyProperties {
    private String clientId;
    private String clientSecret;
    private String getSurveysUrl;
}