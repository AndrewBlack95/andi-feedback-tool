package com.and.digital.service.response;

import com.and.digital.domain.surveymonkey.dao.Question;
import com.and.digital.domain.surveymonkey.dao.SurveyAnswer;
import com.and.digital.domain.surveymonkey.dto.AnswerDto;
import org.springframework.stereotype.Component;

@Component
public class SingleChoice implements AnswerMapper {

    @Override
    public AnswerDto mapResponse(final SurveyAnswer answerFromResponses, final Question question) {
        final AnswerDto answerDto = new AnswerDto();
        answerDto.setValue(answerFromResponses.getText());
        return answerDto;
    }

    @Override
    public QuestionType getQuestionType() {
        return QuestionType.SINGLE_CHOICE;
    }
}
