package com.and.digital.service;

import com.and.digital.domain.surveymonkey.SurveyData;
import com.and.digital.repository.SurveyMonkeyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SurveyMonkeyService {

    private final SurveyMonkeyRepository surveyMonkeyRepository;

    public List<SurveyData> getSurveys() {
        return surveyMonkeyRepository
                .getSurveys()
                .getData();
    }
}