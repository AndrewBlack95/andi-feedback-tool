package com.and.digital.domain.surveymonkey.dao;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class Question {
    private static ObjectMapper OBJECT_MAPPER = new ObjectMapper();
    
    private String id;
    private List<Heading> headings;
    private String family;
    private List<SurveyAnswer> answers;

    public void setAnswers(final Object answers) {
        if (answers instanceof List) {
            this.answers = ((List<?>) answers)
                    .stream()
                    .map(surveyAnswer -> OBJECT_MAPPER.convertValue(surveyAnswer, SurveyAnswer.class))
                    .collect(Collectors.toList());
        } else {
            final SurveyAnswer surveyAnswer = OBJECT_MAPPER.convertValue(answers, SurveyAnswer.class);
            this.answers = Collections.singletonList(surveyAnswer);
        }
    }
}