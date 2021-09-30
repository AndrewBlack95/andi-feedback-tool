package com.and.digital.service;

import com.and.digital.domain.surveymonkey.GetAllSurveysResponse;
import com.and.digital.domain.surveymonkey.SurveyData;
import com.and.digital.repository.SurveyMonkeyRepository;
import com.and.digital.service.response.QuestionMapper;
import com.and.digital.service.response.QuestionType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import static java.util.Collections.emptyList;
import static java.util.Objects.nonNull;

@Service
@RequiredArgsConstructor
public class SurveyMonkeyService {

    private final SurveyMonkeyRepository surveyMonkeyRepository;

    private Map<QuestionType, QuestionMapper> questionMappersMap;

    @PostConstruct
    public void init(final List<QuestionMapper> questionMappers) {
        questionMappersMap = questionMappers
                .stream()
                .collect(Collectors.toMap(QuestionMapper::getQuestionType, Function.identity()));
    }

    public Object example() {
        final String questionType = "type";
        final QuestionMapper questionMapper = questionMappersMap.get(questionType);
        return questionMapper.mapResponse(new Object());
    }

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