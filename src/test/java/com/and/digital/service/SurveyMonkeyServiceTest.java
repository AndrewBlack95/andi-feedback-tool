package com.and.digital.service;

import com.and.digital.common.TestData;
import com.and.digital.domain.surveymonkey.SurveyData;
import com.and.digital.repository.SurveyMonkeyRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.client.RestClientException;

import java.util.List;

import static com.and.digital.common.TestData.getExpectedGetAllSurveysResponses;
import static com.and.digital.common.TestData.getExpectedSurveyData;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class SurveyMonkeyServiceTest {

    @InjectMocks
    private SurveyMonkeyService classUnderTest;

    @Mock
    private SurveyMonkeyRepository mockSurveyMonkeyRepository;


    @Test
    void getSurveys_responsesReturned_success() {
        final List<SurveyData> expectedSurveyData = getExpectedSurveyData();
        when(mockSurveyMonkeyRepository.getSurveys()).thenReturn(getExpectedGetAllSurveysResponses().getBody());
        Assertions.assertEquals(expectedSurveyData, classUnderTest.getSurveys());
    }

    @Test
    void getSurveys_repositoryThrowsException_exceptionThrown() {
        final String errorMsg = "Error with request";
        when(mockSurveyMonkeyRepository.getSurveys()).thenThrow(new RestClientException(errorMsg));

        assertThrows(RestClientException.class, () -> classUnderTest.getSurveys(), errorMsg);
    }
}