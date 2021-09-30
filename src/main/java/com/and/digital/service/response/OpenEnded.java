package com.and.digital.service.response;

import com.and.digital.domain.surveymonkey.dao.Question;
import com.and.digital.domain.surveymonkey.dao.SurveyAnswer;
import com.and.digital.domain.surveymonkey.dto.AnswerDto;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class OpenEnded implements AnswerMapper {

    @Override
    public AnswerDto mapResponse(final List<SurveyAnswer> answersFromResponses, final Question question) {
        if (answersFromResponses.isEmpty()) {
            return new AnswerDto();
        }
        final SurveyAnswer surveyAnswer = answersFromResponses.get(0);
        final AnswerDto answerDto = new AnswerDto();
        answerDto.setValue(surveyAnswer.getText());
        return answerDto;
    }

    @Override
    public QuestionType getQuestionType() {
        return QuestionType.OPEN_ENDED;
    }
}