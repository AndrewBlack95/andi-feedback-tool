//package com.and.digital.web;
//
//import com.and.digital.exception.TokenExchangeException;
//import com.and.digital.service.SurveyMonkeyService;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.mock.web.MockHttpServletRequest;
//
//import static com.and.digital.common.TestData.ERROR_MSG;
//import static org.hamcrest.CoreMatchers.is;
//import static org.hamcrest.MatcherAssert.assertThat;
//import static org.junit.jupiter.api.Assertions.assertThrows;
//import static org.mockito.Mockito.when;
//
//@ExtendWith(MockitoExtension.class)
//class LoginControllerTest {
//
//    @Mock private SurveyMonkeyService service;
//    private LoginController controllerUnderTest;
//
//    @BeforeEach
//    void setup() {
//        controllerUnderTest = new LoginController(service);
//    }
//
//    @Test
//    void login_ReturnsLoginUrl() {
//        final String loginPage = "some markup denoting a login page";
//        when(service.getLoginURL())
//                .thenReturn(loginPage);
//
//        ResponseEntity<String> result = controllerUnderTest.login();
//
//        assertThat(result.getStatusCode(), is(HttpStatus.FOUND));
//        assertThat(result.getHeaders().get("location").get(0), is(loginPage));
//    }
//
//    @Test
//    void exchange_ReturnsLongLivedCode() {
//        final String shortLivedCode = "1234";
//        final String longLivedCode = "12345678";
//        final MockHttpServletRequest request = new MockHttpServletRequest();
//        request.setParameter("code", shortLivedCode);
//        when(service.exchangeShortLivedTokenForBearer(shortLivedCode))
//                .thenReturn(longLivedCode);
//
//        ResponseEntity<String> result = controllerUnderTest.exchangeTokens(shortLivedCode);
//
//        assertThat(result.getStatusCode(), is(HttpStatus.OK));
//        assertThat(result.getBody(), is(longLivedCode));
//    }
//
//    @Test
//    void exchange_emptyShortCode_ThrowsTokenExchangeException() {
//        final String shortLivedCode = "";
//        final MockHttpServletRequest request = new MockHttpServletRequest();
//        request.setParameter("code", shortLivedCode);
//
//        assertThrows(TokenExchangeException.class, () -> controllerUnderTest.exchangeTokens(shortLivedCode), ERROR_MSG);
//    }
//
//    @Test
//    void exchange_nullShortCode_ThrowsTokenExchangeException() {
//        final String shortLivedCode = null;
//        final MockHttpServletRequest request = new MockHttpServletRequest();
//        request.setParameter("code", shortLivedCode);
//
//        assertThrows(TokenExchangeException.class, () -> controllerUnderTest.exchangeTokens(shortLivedCode), ERROR_MSG);
//    }
//}