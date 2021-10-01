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
    @JsonProperty("choice_id")
    private String choiceId;
    @JsonProperty("row_id")
    private String rowId;
    @JsonProperty("other_id")
    private String otherId;
    private List<Choice> choices;
    private List<Row> rows;
    private Other other;
}
