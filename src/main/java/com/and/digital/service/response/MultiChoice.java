package com.and.digital.service.response;

import org.springframework.stereotype.Component;

@Component
public class MultiChoice implements QuestionMapper {
    @Override
    public Object mapResponse(final Object object) {
        return null;
    }

    @Override
    public QuestionType getQuestionType() {
        return QuestionType.MULTI_CHOICE;
    }
}
