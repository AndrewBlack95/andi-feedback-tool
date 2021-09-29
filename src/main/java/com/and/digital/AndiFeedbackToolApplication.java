package com.and.digital;

import com.and.digital.domain.config.SurveyMonkeyProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.PropertySource;

@EnableConfigurationProperties(SurveyMonkeyProperties.class)
@PropertySource("file:/opt/applications/SurveyMonkey.properties")
@SpringBootApplication
public class AndiFeedbackToolApplication {

	public static void main(String[] args) {
		SpringApplication.run(AndiFeedbackToolApplication.class, args);
	}

}