package com.and.digital.service;

import com.and.digital.domain.dao.SurveyDao;
import com.and.digital.domain.response.SurveyMonkeyData;
import com.and.digital.repository.SurveyMonkeyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SurveyMonkeyService {

    private final SurveyMonkeyRepository surveyMonkeyRepository;

    public List<SurveyDao> getSurveys() {
        final List<SurveyMonkeyData> surveyMonkeyData = surveyMonkeyRepository.getSurveys().getData();
        return getNormalisedSurveys(surveyMonkeyData);
    }

    private List<SurveyDao> getNormalisedSurveys(final List<SurveyMonkeyData> surveyMonkeyData) {
        return surveyMonkeyData.stream()
                .map(survey -> new SurveyDao(survey.getId(), survey.getTitle()))
                .collect(Collectors.toList());
    }
}