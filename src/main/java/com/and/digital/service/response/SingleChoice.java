package com.and.digital.service.response;

import com.and.digital.domain.surveymonkey.dao.Question;
import com.and.digital.domain.surveymonkey.dao.SurveyAnswer;
import com.and.digital.domain.surveymonkey.dto.AnswerDto;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import java.util.List;

import static java.util.Objects.nonNull;

@Component
public class SingleChoice implements AnswerMapper {

    @Override
    public AnswerDto mapResponse(final List<SurveyAnswer> answersFromResponses, final Question question) {
        if (answersFromResponses.isEmpty()) {
            return new AnswerDto();
        }
        final SurveyAnswer surveyAnswer = answersFromResponses.get(0);
        final AnswerDto answerDto = new AnswerDto();

        final String choiceId = surveyAnswer.getChoiceId();

        final SurveyAnswer answerFromDetails = question
                .getAnswers()
                .stream()
                .filter(entry -> entry.getChoiceId().equals(choiceId))
                .findFirst()
                .orElse(null);

        String valueFromChoice = StringUtils.EMPTY;
        if (nonNull(answerFromDetails)) {
            valueFromChoice = answerFromDetails.getText();
        }

        answerDto.setValue(valueFromChoice);
        return answerDto;
    }

    @Override
    public QuestionType getQuestionType() {
        return QuestionType.SINGLE_CHOICE;
    }
}
