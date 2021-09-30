package com.and.digital.service.response;

import com.and.digital.domain.surveymonkey.dao.Question;
import com.and.digital.domain.surveymonkey.dao.SurveyAnswer;
import com.and.digital.domain.surveymonkey.dto.AnswerDto;

public interface AnswerMapper {
    AnswerDto mapResponse(final SurveyAnswer answerFromResponses, final Question question);

    QuestionType getQuestionType();
}
