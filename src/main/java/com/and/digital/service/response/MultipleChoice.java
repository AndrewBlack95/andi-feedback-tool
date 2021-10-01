package com.and.digital.service.response;

import com.and.digital.domain.surveymonkey.dao.Choice;
import com.and.digital.domain.surveymonkey.dao.Question;
import com.and.digital.domain.surveymonkey.dao.SurveyAnswer;
import com.and.digital.domain.surveymonkey.dto.AnswerDto;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static java.util.Objects.nonNull;

@Component
public class MultipleChoice implements AnswerMapper, ChoiceMapper {

    @Override
    public List<AnswerDto> mapResponse(final List<SurveyAnswer> answersFromResponses, final Question question) {
        final List<SurveyAnswer> answersFromDetails = question.getAnswers();

        if (answersFromResponses.isEmpty() || answersFromDetails.isEmpty()) {
            return Collections.emptyList();
        }

        final List<AnswerDto> answerDtos = new ArrayList<>();

        for (SurveyAnswer surveyAnswerFromResponses : answersFromResponses) {
            final String choiceId = surveyAnswerFromResponses.getChoiceId();

            final SurveyAnswer surveyAnswer = answersFromDetails.get(0);

            final Choice choiceFromDetails = surveyAnswer
                    .getChoices()
                    .stream()
                    .filter(entry -> entry.getId().equals(choiceId)).findFirst()
                    .orElse(null);

            if (nonNull(choiceFromDetails)) {
                AnswerDto answerDto = new AnswerDto();
                setScoreAndValue(answerDto, choiceFromDetails);
                answerDtos.add(answerDto);
            }
        }

        return answerDtos;
    }

    @Override
    public QuestionType getQuestionType() {
        return QuestionType.MULTIPLE_CHOICE;
    }
}
