package com.and.digital.service.response;

import com.and.digital.domain.surveymonkey.dao.Choice;
import com.and.digital.domain.surveymonkey.dto.AnswerDto;
import org.apache.commons.lang3.StringUtils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public interface ChoiceMapper extends AnswerMapper {

    String HYPHEN_REGEX = "^([-])";
    String NUMBER_REGEX = "^([0-9]+)";

    default void setScoreAndValue(final AnswerDto answerDto, final Choice choiceFromDetails) {
        final Pattern numberPattern = Pattern.compile(NUMBER_REGEX);
        final String textFromDetails = choiceFromDetails.getText().trim();
        final Matcher numberMatcher = numberPattern.matcher(textFromDetails);

        if (numberMatcher.find()) {
            final String numberFromString = numberMatcher.group();
            answerDto.setScore(Integer.parseInt(numberFromString));

            final String textExcludingNumber = textFromDetails.replace(numberFromString, StringUtils.EMPTY).trim();
            final Pattern hyphenPattern = Pattern.compile(HYPHEN_REGEX);
            final Matcher hyphenMatcher = hyphenPattern.matcher(textExcludingNumber);

            if (hyphenMatcher.find()) {
                final String textExcludingHyphen = textExcludingNumber.substring(1).trim();
                answerDto.setValue(textExcludingHyphen);
                return;
            }
        }
        answerDto.setValue(textFromDetails);
    }
}

