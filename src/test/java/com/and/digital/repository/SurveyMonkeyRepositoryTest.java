package com.and.digital.repository;

import com.and.digital.domain.response.SurveyMonkeyData;
import com.and.digital.domain.response.SurveyMonkeyResponse;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
class SurveyMonkeyRepositoryTest {

    @InjectMocks
    private SurveyMonkeyRepository classUnderTest;

    @Mock
    private RestTemplate mockRestTemplate;


    @Test
    void getSurveys_responsesReturned_success() {
        Mockito.when(mockRestTemplate.getForEntity("https://dummy/api/", SurveyMonkeyResponse.class)).thenReturn(getExpectedTestData());
        assertEquals(getExpectedTestData().getBody(), classUnderTest.getSurveys());
    }

    private ResponseEntity<SurveyMonkeyResponse> getExpectedTestData() {
        final SurveyMonkeyData surveyMonkeyData = new SurveyMonkeyData("306517922", "Onboarding Pathway 1 Evaluation");
        final SurveyMonkeyData surveyMonkeyData1 = new SurveyMonkeyData("306517987", "SOUTH 7th June ANDbootcamp - Week 1 Evaluation");
        final SurveyMonkeyData surveyMonkeyData2 = new SurveyMonkeyData("306517253", "SOUTH 7th June ANDbootcamp - Week 2 Evaluation");
        final SurveyMonkeyData surveyMonkeyData3 = new SurveyMonkeyData("986517987", "RMT 1st June AMS Glas ANDbootcamp - Week 3 Evaluation");
        final List<SurveyMonkeyData> surveyMonkeyDataList = Arrays.asList(surveyMonkeyData, surveyMonkeyData1, surveyMonkeyData3, surveyMonkeyData2);
        final SurveyMonkeyResponse surveyResponse = new SurveyMonkeyResponse();
        surveyResponse.setData(surveyMonkeyDataList);
        return new ResponseEntity<>(surveyResponse, HttpStatus.OK);
    }
}