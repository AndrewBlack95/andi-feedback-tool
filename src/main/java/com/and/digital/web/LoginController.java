package com.and.digital.web;

import com.and.digital.exception.TokenExchangeException;
import com.and.digital.service.SurveyMonkeyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@Slf4j
@RequiredArgsConstructor
@RestController
public class LoginController {

    private static final String CODE = "code";
    private final SurveyMonkeyService surveyMonkeyService;

    @GetMapping("/login")
    public ResponseEntity<String> login() {
        final String apiResponse = surveyMonkeyService.getLoginPage();
        final HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("location", apiResponse);

        return ResponseEntity.status(HttpStatus.FOUND)
                .headers(responseHeaders)
                .build();
    }

    @GetMapping("/exchange-token")
    public ResponseEntity<HashMap<String, String>> exchangeTokens(@RequestParam String code) {
        if (code == null || code.isEmpty()) {
            throw new TokenExchangeException("Could not exchange short lived token for bearer token");
        }

        final String longLivedCode = surveyMonkeyService.exchangeShortLivedTokenForBearer(code);
        final HashMap<String, String> response = new HashMap<>();
        response.put("code", longLivedCode);
        return ResponseEntity.ok(response);
    }
}








