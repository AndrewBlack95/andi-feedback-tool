package com.and.digital.config;

import org.apache.commons.lang3.StringUtils;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpRequest;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.io.IOException;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CommonConfigTest {

    private static final String TOKEN = "3247930589438504385020930";
    @Spy
    private CommonConfig classUnderTest;

    @Mock
    private MockHttpServletRequest mockHttpServletRequest;

    @Mock
    private HttpRequest mockHttpRequest;

    @Mock
    private ClientHttpRequestExecution mockClientHttpRequestExecution;

    @Mock
    private ClientHttpResponse mockClientHttpResponse;

    @Test
    void restTemplate_templateBuilt_success() throws IOException {
        final RestTemplateBuilder restTemplateBuilder = new RestTemplateBuilder();
        final HttpHeaders httpHeaders = new HttpHeaders();
        final ServletRequestAttributes servletRequestAttributes = new ServletRequestAttributes(mockHttpServletRequest);
        final RestTemplate resultTemplate = classUnderTest.restTemplate(restTemplateBuilder);

        assertNotNull(resultTemplate);
        assertEquals(1, resultTemplate.getInterceptors().size());

        when(mockHttpRequest.getHeaders()).thenReturn(httpHeaders);
        when(mockClientHttpRequestExecution.execute(mockHttpRequest, null)).thenReturn(mockClientHttpResponse);
        when(mockHttpServletRequest.getHeader(HttpHeaders.AUTHORIZATION)).thenReturn(TOKEN);
        when(classUnderTest.getServletRequestAttributes()).thenReturn(servletRequestAttributes);

        final ClientHttpRequestInterceptor clientHttpRequestInterceptor = resultTemplate.getInterceptors().get(0);
        final ClientHttpResponse resultedResponse = clientHttpRequestInterceptor.intercept(mockHttpRequest, null, mockClientHttpRequestExecution);

        assertEquals(mockClientHttpResponse, resultedResponse);
        assertEquals(List.of(TOKEN), httpHeaders.get(HttpHeaders.AUTHORIZATION));
        verify(mockClientHttpRequestExecution).execute(mockHttpRequest, null);
        verify(mockHttpRequest).getHeaders();
        verify(classUnderTest).getServletRequestAttributes();
        verify(mockHttpServletRequest).getHeader(HttpHeaders.AUTHORIZATION);

        verifyNoMoreInteractions(mockHttpServletRequest);
        verifyNoMoreInteractions(mockClientHttpRequestExecution);
        verifyNoMoreInteractions(mockHttpRequest);

    }

    @Test
    void getBearerTokenFromRequest_noRequestAttributes_emptyToken() {
        when(classUnderTest.getServletRequestAttributes()).thenReturn(null);

        assertEquals(StringUtils.EMPTY, classUnderTest.getBearerTokenFromRequest());

        verify(classUnderTest).getServletRequestAttributes();
        verify(classUnderTest).getBearerTokenFromRequest();
        verifyNoMoreInteractions(classUnderTest);
    }
}