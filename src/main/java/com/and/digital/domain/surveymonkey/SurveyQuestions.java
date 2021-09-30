package com.and.digital.domain.surveymonkey;

import lombok.Data;

import java.util.List;

@Data
public class SurveyQuestions {
    private final String id;
    private final List<String> headings;
    private final List<SurveyAnswers> answers;
}
