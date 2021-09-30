package com.and.digital.service;

import com.and.digital.domain.surveymonkey.GetAllSurveysResponse;
import com.and.digital.domain.surveymonkey.SurveyData;
import com.and.digital.repository.SurveyMonkeyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.util.Collections.emptyList;
import static java.util.Objects.nonNull;

@Service
@RequiredArgsConstructor
public class SurveyMonkeyService {

    private final SurveyMonkeyRepository surveyMonkeyRepository;

    public List<SurveyData> getAllSurveys() {
        final GetAllSurveysResponse getAllSurveysResponse = surveyMonkeyRepository.getAllSurveysResponse();
        final List<SurveyData> surveys = getAllSurveysResponse.getData();
        return (nonNull(surveys) ? surveys : emptyList());
    }

    // public List<Object> getResponsesForSurvey(final String id) {

    //}


    public String exchangeShortLivedTokenForBearer(final String shortLivedToken) {
        return surveyMonkeyRepository.exchangeShortLivedTokenForBearer(shortLivedToken);
    }

    public String getLoginPage() {
        return surveyMonkeyRepository.getLoginPage();
    }
}