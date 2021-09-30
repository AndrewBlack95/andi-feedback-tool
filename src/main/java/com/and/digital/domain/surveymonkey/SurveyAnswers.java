package com.and.digital.domain.surveymonkey;

import lombok.Data;

@Data
public class SurveyAnswers {
    private final String responseId;
    private final String value;
    //placeholder data type
    private final String type;
}
