package com.and.digital.service;

import com.and.digital.domain.surveymonkey.dao.*;
import com.and.digital.domain.surveymonkey.dto.AnswerDto;
import com.and.digital.domain.surveymonkey.dto.QuestionResponseDto;
import com.and.digital.domain.surveymonkey.dto.SurveyResponseDto;
import com.and.digital.repository.SurveyMonkeyRepository;
import com.and.digital.service.response.AnswerMapper;
import com.and.digital.service.response.QuestionType;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

import static java.util.Collections.emptyList;
import static java.util.Objects.nonNull;

@Service
@Slf4j
public class SurveyMonkeyService {

    private final SurveyMonkeyRepository surveyMonkeyRepository;

    private final Map<QuestionType, AnswerMapper> questionMappersMap;

    public SurveyMonkeyService(final SurveyMonkeyRepository surveyMonkeyRepository, final List<AnswerMapper> answerMappers) {
        this.surveyMonkeyRepository = surveyMonkeyRepository;
        this.questionMappersMap = answerMappers
                .stream()
                .collect(Collectors.toMap(AnswerMapper::getQuestionType, Function.identity()));
    }

    public List<SurveyData> getAllSurveys() {
        final GetAllSurveysResponse getAllSurveysResponse = surveyMonkeyRepository.getAllSurveysResponse();
        final List<SurveyData> surveys = getAllSurveysResponse.getData();
        return (nonNull(surveys) ? surveys : emptyList());
    }

    public SurveyResponseDto getResponsesForSurvey(final String surveyId) {
        final Set<Question> surveyQuestionsFromResponse = getQuestionsFromResponses(surveyId);


        final SurveyDetails surveyDetails = surveyMonkeyRepository.getSurveyDetails(surveyId);
        final Set<Question> surveyQuestionsFromDetails = getQuestionsFromDetails(surveyDetails);

        final SurveyResponseDto surveyResponse = getSurveyResponseDto(surveyDetails);

        final List<QuestionResponseDto> questionResponses = new ArrayList<>();

        for (final Question questionFromDetails : surveyQuestionsFromDetails) {
            final QuestionType questionType = QuestionType.fromString(questionFromDetails.getFamily());
            final AnswerMapper answerMapper = questionMappersMap.get(questionType);

            final List<Question> questionInfoResponses = surveyQuestionsFromResponse
                    .stream()
                    .filter(question -> question.getId().equals(questionFromDetails.getId())).collect(Collectors.toList());

            if (nonNull(answerMapper)) {

                final List<AnswerDto> answersFromAllResponse = questionInfoResponses.stream()
                        .map(Question::getAnswers)
                        .flatMap(Collection::stream)
                        .filter(Objects::nonNull)
                        .map(answerMapper::mapResponse)
                        .collect(Collectors.toList());

                final String heading = questionFromDetails.getHeadings().get(0).getHeading();
                questionResponses.add(new QuestionResponseDto(questionType, heading, answersFromAllResponse));
            }
        }
        surveyResponse.setQuestions(questionResponses);
        return surveyResponse;
    }


    public String exchangeShortLivedTokenForBearer(final String shortLivedToken) {
        return surveyMonkeyRepository.exchangeShortLivedTokenForBearer(shortLivedToken);
    }

    public String getLoginPage() {
        return surveyMonkeyRepository.getLoginPage();
    }

    private SurveyResponseDto getSurveyResponseDto(final SurveyDetails surveyDetails) {
        final SurveyResponseDto surveyResponse = new SurveyResponseDto();
        surveyResponse.setSurveyId(surveyDetails.getId());
        surveyResponse.setName(surveyDetails.getTitle());
        surveyResponse.setQuestionCount(surveyDetails.getQuestionCount());
        return surveyResponse;
    }

    private Set<Question> getQuestionsFromResponses(final String surveyId) {
        final GetSurveyResponses getSurveyResponses = surveyMonkeyRepository.getIndividualSurveyResponses(surveyId);
        final Set<SurveyPage> surveyPages = getSurveyResponses
                .getData()
                .stream()
                .map(ResponseData::getPages)
                .flatMap(Collection::stream)
                .collect(Collectors.toSet());
        return surveyPages
                .stream()
                .map(SurveyPage::getQuestions)
                .flatMap(Collection::stream)
                .collect(Collectors.toSet());
    }

    private Set<Question> getQuestionsFromDetails(final SurveyDetails surveyDetails) {
        return surveyDetails
                .getPages()
                .stream()
                .map(SurveyPage::getQuestions)
                .flatMap(Collection::stream)
                .collect(Collectors.toSet());
    }
}