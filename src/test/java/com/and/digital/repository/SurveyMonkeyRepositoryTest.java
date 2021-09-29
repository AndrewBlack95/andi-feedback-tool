package com.and.digital.repository;

import com.and.digital.common.TestData;
import com.and.digital.domain.surveymonkey.GetAllSurveysResponse;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.client.RestTemplate;

import static com.and.digital.common.TestData.getExpectedGetAllSurveysResponses;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class SurveyMonkeyRepositoryTest {

    @InjectMocks
    private SurveyMonkeyRepository classUnderTest;

    @Mock
    private RestTemplate mockRestTemplate;

    @Test
    void getSurveys_responsesReturned_success() {
        when(mockRestTemplate.getForEntity("https://dummy/api/",
                GetAllSurveysResponse.class)).thenReturn(getExpectedGetAllSurveysResponses());

        assertEquals(TestData.getExpectedGetAllSurveysResponses().getBody(), classUnderTest.getAllSurveysResponse());
        verifyNoMoreInteractions(mockRestTemplate);
    }

    @Test
    void getSurveys_errorReturned_exceptionThrown() {

    }
}