package com.and.digital.domain.surveymonkey.dao;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class SurveyDetails {
    private final String id;
    private final String title;
    @JsonProperty("question_count")
    private final int questionCount;
    @JsonProperty("response_count")
    private final int responseCount;
    @JsonProperty("date_created")
    private LocalDateTime dateCreated;
    private List<SurveyPage> pages;

}
