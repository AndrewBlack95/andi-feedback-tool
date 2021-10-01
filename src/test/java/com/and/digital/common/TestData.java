package com.and.digital.common;

import com.and.digital.domain.surveymonkey.dao.GetAllSurveysResponse;
import com.and.digital.domain.surveymonkey.dao.SurveyData;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

public class TestData {

    public static final String ERROR_MSG = "Error with request";

    public static ResponseEntity<GetAllSurveysResponse> getExpectedGetAllSurveysResponses() {
        final SurveyData surveyData = new SurveyData("306517922", "Onboarding Pathway 1 Evaluation");
        final SurveyData surveyData1 = new SurveyData("306517987", "SOUTH 7th June ANDbootcamp - Week 1 Evaluation");
        final SurveyData surveyData2 = new SurveyData("306517253", "SOUTH 7th June ANDbootcamp - Week 2 Evaluation");
        final SurveyData surveyData3 = new SurveyData("986517987", "RMT 1st June AMS Glas ANDbootcamp - Week 3 Evaluation");
        final List<SurveyData> surveyDataList = Arrays.asList(surveyData, surveyData1, surveyData3, surveyData2);
        final GetAllSurveysResponse getAllSurveysResponse = new GetAllSurveysResponse();
        getAllSurveysResponse.setData(surveyDataList);
        return new ResponseEntity<>(getAllSurveysResponse, HttpStatus.OK);
    }

    public static List<SurveyData> getExpectedSurveyData() {
        return getExpectedGetAllSurveysResponses().getBody().getData();
    }
}
