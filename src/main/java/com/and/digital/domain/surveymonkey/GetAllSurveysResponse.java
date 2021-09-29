package com.and.digital.domain.surveymonkey;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class GetAllSurveysResponse {
    private List<SurveyData> data;
}