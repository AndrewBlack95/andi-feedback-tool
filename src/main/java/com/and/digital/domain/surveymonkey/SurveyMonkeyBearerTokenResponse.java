package com.and.digital.domain.surveymonkey;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SurveyMonkeyBearerTokenResponse {
    @JsonProperty("access_token")
    private String accessToken;
}
