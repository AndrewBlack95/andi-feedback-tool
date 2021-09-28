package com.and.digital.domain.surveymonkey;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class SurveyMonkeyResponse {
    private List<SurveyMonkeyData> data;
}