package com.and.digital.domain.surveymonkey.dto;

import com.and.digital.service.response.QuestionType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionResponseDto {
    private QuestionType questionType;
    private String title;
    private List<AnswerDto> answers;
}
