package exception;

import com.and.digital.exception.GlobalExceptionHandler;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.HttpClientErrorException;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
class GlobalExceptionHandlerTest {

    @InjectMocks
    private GlobalExceptionHandler classUnderTest;

    @Test
    void handleUnauthorizedException_responseEntityReturned_success() {
        final String errorMsg = "Unable to authenticate user";
        final HttpClientErrorException.Unauthorized ex = (HttpClientErrorException.Unauthorized) HttpClientErrorException.Unauthorized.create(HttpStatus.UNAUTHORIZED, errorMsg, null, null, null);

        final String expectedErrorMsg = String.format("401 %s", errorMsg);
        final ResponseEntity<String> result = classUnderTest.handleUnauthorizedException(ex);
        assertEquals(HttpStatus.UNAUTHORIZED, result.getStatusCode());
        assertEquals(expectedErrorMsg, result.getBody());
    }
}