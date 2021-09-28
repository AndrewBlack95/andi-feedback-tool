package com.and.digital.controller;

import com.and.digital.domain.surveymonkey.SurveyData;
import com.and.digital.service.SurveyMonkeyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/")
public class SurveyMonkeyController {

    private final SurveyMonkeyService surveyMonkeyService;

    @GetMapping("/surveys")
    public List<SurveyData> getAllSurveys() {
        log.info("Received request for all surveys");
        return surveyMonkeyService.getAllSurveys();
    }
}