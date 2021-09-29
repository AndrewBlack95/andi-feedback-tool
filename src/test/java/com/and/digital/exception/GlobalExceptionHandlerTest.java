package com.and.digital.exception;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.HttpClientErrorException;

import static com.and.digital.common.TestData.ERROR_MSG;
import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
class GlobalExceptionHandlerTest {

    @InjectMocks
    private GlobalExceptionHandler classUnderTest;

    @Test
    void handleUnauthorizedException_responseEntityReturned_success() {
        final HttpClientErrorException.Unauthorized ex = (HttpClientErrorException.Unauthorized) HttpClientErrorException.Unauthorized.create(HttpStatus.UNAUTHORIZED, ERROR_MSG, null, null, null);

        final String expectedErrorMsg = String.format("401 %s", ERROR_MSG);
        final ResponseEntity<String> result = classUnderTest.handleUnauthorizedException(ex);

        assertEquals(HttpStatus.UNAUTHORIZED, result.getStatusCode());
        assertEquals(expectedErrorMsg, result.getBody());
    }
}