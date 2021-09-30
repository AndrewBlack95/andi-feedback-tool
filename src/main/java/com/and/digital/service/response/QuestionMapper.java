package com.and.digital.service.response;

public interface QuestionMapper {
    Object mapResponse(final Object object);

    QuestionType getQuestionType();
}
