package com.and.digital.domain.surveymonkey.dto;

import com.and.digital.service.response.QuestionType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionResponseDto {
    private QuestionType questionType;
    private String title;
    private Map<String, List<List<AnswerDto>>> responseMap;
}
