package com.and.digital.config;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.web.client.RestTemplate;

@Configuration
public class CommonConfig {
    @Bean
    public RestTemplate restTemplate(final RestTemplateBuilder builder) {
        return builder.additionalInterceptors((request, body, execution) -> {
            //This will likely change to be an on request basis but putting it here for now to prove it out
            request.getHeaders().add(HttpHeaders.AUTHORIZATION, "Bearer will be here ");
            return execution.execute(request, body);
        }).build();
    }
}