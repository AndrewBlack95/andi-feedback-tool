package com.and.digital.controller;

import com.and.digital.domain.surveymonkey.dao.SurveyData;
import com.and.digital.service.SurveyMonkeyService;
import com.and.digital.web.SurveyMonkeyController;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.client.RestClientException;

import java.util.List;

import static com.and.digital.common.TestData.getExpectedSurveyData;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verifyNoMoreInteractions;
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
        when(mockSurveyMonkeyService.getAllSurveys()).thenReturn(expectedSurveyData);

        assertEquals(expectedSurveyData, classUnderTest.getAllSurveys());
        verifyNoMoreInteractions(mockSurveyMonkeyService);
    }

    @Test
    void getSurveys_serviceThrowsException_exceptionThrown() {
        final String errorMsg = "Error with request";
        when(mockSurveyMonkeyService.getAllSurveys()).thenThrow(new RestClientException(errorMsg));

        assertThrows(RestClientException.class, () -> classUnderTest.getAllSurveys(), errorMsg);
        verifyNoMoreInteractions(mockSurveyMonkeyService);
    }
}