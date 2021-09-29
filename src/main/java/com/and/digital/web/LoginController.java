package com.and.digital.web;

import com.and.digital.service.SurveyMonkeyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
public class LoginController {

    private static final String CODE = "code";
    private final SurveyMonkeyService surveyMonkeyService;

    @GetMapping("/login")
    public ResponseEntity<String> login() {
        final String apiResponse = surveyMonkeyService.getLoginPage();
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/exchange-token")
    public String exchangeTokens(@RequestParam String code) {

        if (code == null || code.isEmpty()) {
            //TODO replace with custom exception
            throw new IllegalArgumentException("Need a short lived code to proceed any further.");
        }

        return "";
    }
}








