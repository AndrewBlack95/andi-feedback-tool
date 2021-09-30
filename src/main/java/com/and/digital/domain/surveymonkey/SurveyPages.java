package com.and.digital.domain.surveymonkey;

import lombok.Data;

import java.util.List;

@Data
public class SurveyPages {
    private final List<SurveyQuestions> questions;
}
