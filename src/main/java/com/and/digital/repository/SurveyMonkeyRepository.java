package com.and.digital.repository;

import com.and.digital.domain.surveymonkey.GetAllSurveysResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Slf4j
@RequiredArgsConstructor
@Repository
public class SurveyMonkeyRepository {

    private final RestTemplate restTemplate;

    public GetAllSurveysResponse getAllSurveysResponse() {
        try {
            final ResponseEntity<GetAllSurveysResponse> surveys = restTemplate.getForEntity("https://dummy/api/", GetAllSurveysResponse.class);
            return surveys.getBody();
        } catch (final RestClientException e) {
            log.error("Exception from Survey Monkey:", e);
            throw e;
        }
    }
}
