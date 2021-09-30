package com.and.digital.service.response;

import com.and.digital.domain.surveymonkey.dao.Question;
import com.and.digital.domain.surveymonkey.dao.SurveyAnswer;
import com.and.digital.domain.surveymonkey.dto.AnswerDto;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class Matrix implements AnswerMapper {

    @Override
    public AnswerDto mapResponse(final List<SurveyAnswer> answersFromResponses, final Question question) {
        final AnswerDto answerDto = new AnswerDto();
        return answerDto;
    }

    @Override
    public QuestionType getQuestionType() {
        return QuestionType.MATRIX;
    }
}
