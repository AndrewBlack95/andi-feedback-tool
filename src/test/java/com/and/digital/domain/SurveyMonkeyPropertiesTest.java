package com.and.digital.domain;

import com.and.digital.config.SurveyMonkeyProperties;
import lombok.Data;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

@Data
class SurveyMonkeyPropertiesTest {

    private SurveyMonkeyProperties classUnderTest;

    @Test
    void testGetterAndSetters_success() {
        final String clientId = "JHSGDF76333";
        final String clientSecret = "2478590389833556";
        final String getSurveysUrl = "http://localhost:9000/dummy";
        classUnderTest = new SurveyMonkeyProperties();
        classUnderTest.setClientId(clientId);
        classUnderTest.setClientSecret(clientSecret);
        classUnderTest.setGetSurveysUrl(getSurveysUrl);

        assertEquals(clientId, classUnderTest.getClientId());
        assertEquals(clientSecret, classUnderTest.getClientSecret());
        assertEquals(getSurveysUrl, classUnderTest.getGetSurveysUrl());
    }
}