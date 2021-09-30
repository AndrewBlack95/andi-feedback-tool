package com.and.digital.config;

import org.apache.commons.lang3.StringUtils;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import static java.util.Objects.nonNull;

@Configuration
public class CommonConfig {
    @Bean
    public RestTemplate restTemplate(final RestTemplateBuilder builder) {
        return builder.additionalInterceptors((request, body, execution) -> {
            request.getHeaders().add(HttpHeaders.AUTHORIZATION, "Bearer v8P3p2WMWTaZNSuDosmN1rKVVOkrTeKfdJ3FbVNLmG0e4vokcZY65s-wXRnXiVYUYcjLEhkE2kiOGi3iRQs8u7IAO40nb5OKQA98SVVAHopNuDJcwpJ4QTjCPQaxjAcM"
            );
            return execution.execute(request, body);
        }).build();
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(final CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedMethods("HEAD", "GET", "PUT", "POST", "DELETE", "PATCH");
            }
        };
    }

    String getBearerTokenFromRequest() {
        final ServletRequestAttributes requestAttributes = getServletRequestAttributes();
        return (nonNull(requestAttributes)) ? requestAttributes.getRequest().getHeader(HttpHeaders.AUTHORIZATION) : StringUtils.EMPTY;
    }

    ServletRequestAttributes getServletRequestAttributes() {
        return ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes());
    }
}