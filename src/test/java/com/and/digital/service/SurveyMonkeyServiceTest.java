package com.and.digital.service;

import com.and.digital.domain.surveymonkey.GetAllSurveysResponse;
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

import static com.and.digital.common.TestData.*;
import static java.util.Collections.emptyList;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class SurveyMonkeyServiceTest {

    @InjectMocks
    private SurveyMonkeyService classUnderTest;

    @Mock
    private SurveyMonkeyRepository mockSurveyMonkeyRepository;

    @Test
    void getAllSurveys_responsesReturned_success() {
        final List<SurveyData> expectedSurveyData = getExpectedSurveyData();
        when(mockSurveyMonkeyRepository.getAllSurveysResponse()).thenReturn(getExpectedGetAllSurveysResponses().getBody());

        Assertions.assertEquals(expectedSurveyData, classUnderTest.getAllSurveys());
        verifyNoMoreInteractions(mockSurveyMonkeyRepository);
    }

    @Test
    void getAllSurveys_nullArray_emptyListReturned() {
        final GetAllSurveysResponse getAllSurveysResponseWithNoSurveys = new GetAllSurveysResponse();
        when(mockSurveyMonkeyRepository.getAllSurveysResponse()).thenReturn(getAllSurveysResponseWithNoSurveys);

        Assertions.assertEquals(emptyList(), classUnderTest.getAllSurveys());
        verifyNoMoreInteractions(mockSurveyMonkeyRepository);

    }

    @Test
    void getAllSurveys_repositoryThrowsException_exceptionThrown() {
        when(mockSurveyMonkeyRepository.getAllSurveysResponse()).thenThrow(new RestClientException(ERROR_MSG));

        assertThrows(RestClientException.class, () -> classUnderTest.getAllSurveys(), ERROR_MSG);
        verifyNoMoreInteractions(mockSurveyMonkeyRepository);
    }
}