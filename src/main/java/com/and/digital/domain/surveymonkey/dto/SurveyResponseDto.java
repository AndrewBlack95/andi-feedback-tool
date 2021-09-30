package com.and.digital.domain.surveymonkey.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class SurveyResponseDto {
    private String surveyId;
    private String name;
    private int questionCount;
    private List<QuestionResponseDto> questions;
}
