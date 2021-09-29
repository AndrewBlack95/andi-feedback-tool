package com.and.digital.exception;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;

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
        final ResponseEntity<String> result = classUnderTest.handleStatusCodeException(ex);

        assertEquals(HttpStatus.UNAUTHORIZED, result.getStatusCode());
        assertEquals(expectedErrorMsg, result.getBody());
    }

    @Test
    void handleInternalServerErrorException_responseEntityReturned_success() {
        final HttpServerErrorException.InternalServerError ex = (HttpServerErrorException.InternalServerError) HttpServerErrorException.InternalServerError.create(HttpStatus.INTERNAL_SERVER_ERROR, ERROR_MSG, null, null, null);

        final String expectedErrorMsg = String.format("500 %s", ERROR_MSG);
        final ResponseEntity<String> result = classUnderTest.handleStatusCodeException(ex);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, result.getStatusCode());
        assertEquals(expectedErrorMsg, result.getBody());
    }

    @Test
    void handleServiceUnavailableException_responseEntityReturned_success() {
        final HttpServerErrorException.ServiceUnavailable ex = (HttpServerErrorException.ServiceUnavailable) HttpServerErrorException.ServiceUnavailable.create(HttpStatus.SERVICE_UNAVAILABLE, ERROR_MSG, null, null, null);

        final String expectedErrorMsg = String.format("503 %s", ERROR_MSG);
        final ResponseEntity<String> result = classUnderTest.handleStatusCodeException(ex);

        assertEquals(HttpStatus.SERVICE_UNAVAILABLE, result.getStatusCode());
        assertEquals(expectedErrorMsg, result.getBody());
    }
}