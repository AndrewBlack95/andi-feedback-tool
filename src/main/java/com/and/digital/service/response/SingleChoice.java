package com.and.digital.service.response;

import com.and.digital.domain.surveymonkey.dao.Choice;
import com.and.digital.domain.surveymonkey.dao.Question;
import com.and.digital.domain.surveymonkey.dao.SurveyAnswer;
import com.and.digital.domain.surveymonkey.dto.AnswerDto;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static java.util.Objects.nonNull;

@Component
public class SingleChoice implements AnswerMapper {

    private static final String HYPHEN_REGEX = "^([-])";
    private static final String NUMBER_REGEX = "^([0-9]+)";

    @Override
    public AnswerDto mapResponse(final List<SurveyAnswer> answersFromResponses, final Question question) {
        final AnswerDto answerDto = new AnswerDto();
        final List<SurveyAnswer> answersFromDetails = question.getAnswers();

        if (answersFromResponses.isEmpty() || answersFromDetails.isEmpty()) {
            return answerDto;
        }
        final SurveyAnswer surveyAnswerFromResponses = answersFromResponses.get(0);
        final SurveyAnswer surveyAnswerFromDetails = answersFromDetails.get(0);

        final String choiceId = surveyAnswerFromResponses.getChoiceId();

        final Choice choiceFromDetails = surveyAnswerFromDetails
                .getChoices()
                .stream()
                .filter(entry -> entry.getId().equals(choiceId))
                .findFirst()
                .orElse(null);

        if (nonNull(choiceFromDetails)) {
            setScoreAndValue(answerDto, choiceFromDetails);
        }

        return answerDto;
    }

    public void setScoreAndValue(final AnswerDto answerDto, final Choice choiceFromDetails) {
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
            }
        }
    }

    @Override
    public QuestionType getQuestionType() {
        return QuestionType.SINGLE_CHOICE;
    }
}