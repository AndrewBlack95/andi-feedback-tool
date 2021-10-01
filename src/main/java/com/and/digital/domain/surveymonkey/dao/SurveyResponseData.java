package com.and.digital.domain.surveymonkey.dao;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class SurveyResponseData {
    private String id;
    private List<SurveyPage> pages;
}
