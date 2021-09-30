package com.and.digital.service.response;

import com.and.digital.domain.surveymonkey.dao.Question;
import com.and.digital.domain.surveymonkey.dao.SurveyAnswer;
import com.and.digital.domain.surveymonkey.dto.AnswerDto;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SingleChoice implements AnswerMapper {

    @Override
    public AnswerDto mapResponse(final List<SurveyAnswer> answersFromResponses, final Question question) {
        final AnswerDto answerDto = new AnswerDto();
        //Get choice based on id
        //get selected choice
        return answerDto;
    }

    @Override
    public QuestionType getQuestionType() {
        return QuestionType.SINGLE_CHOICE;
    }
}
