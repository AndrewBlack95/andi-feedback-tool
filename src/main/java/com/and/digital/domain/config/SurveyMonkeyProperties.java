package com.and.digital.domain.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties(prefix="survey-monkey")
public class SurveyMonkeyProperties {
    private String clientId;
    private String clientSecret;
}
