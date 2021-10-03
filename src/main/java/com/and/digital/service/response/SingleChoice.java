package com.and.digital.service.response;

import com.and.digital.domain.surveymonkey.dao.Choice;
import com.and.digital.domain.surveymonkey.dao.Question;
import com.and.digital.domain.surveymonkey.dao.SurveyAnswer;
import com.and.digital.domain.surveymonkey.dto.AnswerDto;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

import static java.util.Objects.nonNull;

@Component
public class SingleChoice implements AnswerMapper, ChoiceMapper {

    @Override
    public List<AnswerDto> mapResponse(final List<SurveyAnswer> answersFromResponses, final Question question) {
        final AnswerDto answerDto = new AnswerDto();
        final List<SurveyAnswer> answersFromDetails = question.getAnswers();

        if (answersFromResponses.isEmpty() || answersFromDetails.isEmpty()) {
            return Collections.emptyList();
        }
        final SurveyAnswer surveyAnswerFromResponses = answersFromResponses.get(0);
        final SurveyAnswer surveyAnswerFromDetails = answersFromDetails.get(0);

        final String choiceId = surveyAnswerFromResponses.getChoiceId();

        final Choice choiceFromDetails = surveyAnswerFromDetails
                .getChoices()
                .stream()
                .filter(entry -> entry.getId().equals(choiceId))
                .findFirst()
                .orElse(null);

        if (nonNull(choiceFromDetails)) {
            setScoreAndValue(answerDto, choiceFromDetails);
        }
        return Collections.singletonList(answerDto);
    }


    @Override
    public QuestionType getQuestionType() {
        return QuestionType.SINGLE_CHOICE;
    }
}