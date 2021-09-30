package com.and.digital.domain.surveymonkey.dao;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class SurveyAnswer {
    private String text;
//    private List<Choice> choices;
//    private String choiceId;
}
