package com.and.digital.repository;

import com.and.digital.domain.response.SurveyMonkeyResponse;
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

    public SurveyMonkeyResponse getSurveys() {
        try {
            final ResponseEntity<SurveyMonkeyResponse> surveys = restTemplate.getForEntity("https://dummy/api/", SurveyMonkeyResponse.class);
            return surveys.getBody();
        } catch (final RestClientException e) {
            log.error("Exception from Survey Monkey:", e);
            throw e;
        }
    }
}
