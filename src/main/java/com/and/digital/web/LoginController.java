package com.and.digital.web;

import com.and.digital.domain.config.SurveyMonkeyProperties;
import com.and.digital.service.SurveyMonkeyClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RequiredArgsConstructor
@RestController
public class LoginController {

    private static final String CODE = "code";
    private final SurveyMonkeyProperties properties;
    private final SurveyMonkeyClient apiClient;

    @GetMapping("/login")
    public ResponseEntity<String> login() {
        final String apiResponse = apiClient.getLoginPage();
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/exchange-token")
    public String exchangeTokens(HttpServletRequest request) {

        String code = request.getParameter(CODE);

        if (code == null || code.isEmpty()) {
            //TODO replace with custom exception
            throw new IllegalArgumentException("Need a short lived code to proceed any further.");
        }

        return "";
    }
}








