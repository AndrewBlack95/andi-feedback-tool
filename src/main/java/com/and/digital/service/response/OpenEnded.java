package com.and.digital.service.response;

import com.and.digital.domain.surveymonkey.dao.SurveyAnswer;
import com.and.digital.domain.surveymonkey.dto.AnswerDto;
import org.springframework.stereotype.Component;

@Component
public class OpenEnded implements AnswerMapper {

    @Override
    public AnswerDto mapResponse(final SurveyAnswer questionFromResponses) {
        final AnswerDto answerDto = new AnswerDto();
        answerDto.setValue(questionFromResponses.getText());
        return answerDto;
    }

    @Override
    public QuestionType getQuestionType() {
        return QuestionType.OPEN_ENDED;
    }
}
