package com.and.digital.web;

import com.and.digital.domain.config.SurveyMonkeyProperties;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
public class LoginController {

    private final SurveyMonkeyProperties properties;

    @GetMapping("/login")
    public ResponseEntity<String> login() {

        log.info("{} {}", properties.getClientId(), properties.getClientSecret());
        return ResponseEntity.ok("OK");
    }
}








