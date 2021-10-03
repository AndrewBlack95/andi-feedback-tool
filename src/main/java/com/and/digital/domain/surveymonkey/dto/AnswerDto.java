package com.and.digital.domain.surveymonkey.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AnswerDto {
    private String value;
    private int score;
}
