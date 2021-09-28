package com.and.digital.controller;

import com.and.digital.domain.surveymonkey.SurveyData;
import com.and.digital.service.SurveyMonkeyService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.client.RestClientException;

import java.util.List;

import static com.and.digital.common.TestData.getExpectedSurveyData;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class SurveyMonkeyControllerTest {

    @InjectMocks
    private SurveyMonkeyController classUnderTest;

    @Mock
    private SurveyMonkeyService mockSurveyMonkeyService;

    @Test
    void getSurveys_responsesReturned_success() {
        final List<SurveyData> expectedSurveyData = getExpectedSurveyData();
        when(mockSurveyMonkeyService.getSurveys()).thenReturn(expectedSurveyData);
        Assertions.assertEquals(expectedSurveyData, classUnderTest.getAllSurveys());
    }

    @Test
    void getSurveys_serviceThrowsException_exceptionThrown() {
        final String errorMsg = "Error with request";
        when(mockSurveyMonkeyService.getSurveys()).thenThrow(new RestClientException(errorMsg));

        assertThrows(RestClientException.class, () -> classUnderTest.getAllSurveys(), errorMsg);
    }
}