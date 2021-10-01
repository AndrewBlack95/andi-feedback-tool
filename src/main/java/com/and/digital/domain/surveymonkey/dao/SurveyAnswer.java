package com.and.digital.domain.surveymonkey.dao;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class SurveyAnswer {
    private String text;
    private List<Choice> choices;
    @JsonProperty("choice_id")
    private String choiceId;
}
