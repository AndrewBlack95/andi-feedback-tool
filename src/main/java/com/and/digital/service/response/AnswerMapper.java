package com.and.digital.service.response;

import com.and.digital.domain.surveymonkey.dao.Question;
import com.and.digital.domain.surveymonkey.dao.SurveyAnswer;
import com.and.digital.domain.surveymonkey.dto.AnswerDto;

import java.util.List;

public interface AnswerMapper {
    AnswerDto mapResponse(final List<SurveyAnswer> answersFromResponses, final Question question);

    QuestionType getQuestionType();
}
