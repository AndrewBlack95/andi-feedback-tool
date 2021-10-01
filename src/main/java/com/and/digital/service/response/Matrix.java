package com.and.digital.service.response;

import com.and.digital.domain.surveymonkey.dao.Choice;
import com.and.digital.domain.surveymonkey.dao.Question;
import com.and.digital.domain.surveymonkey.dao.Row;
import com.and.digital.domain.surveymonkey.dao.SurveyAnswer;
import com.and.digital.domain.surveymonkey.dto.AnswerDto;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class Matrix implements AnswerMapper {

    @Override
    public List<AnswerDto> mapResponse(final List<SurveyAnswer> answersFromResponses, final Question question) {
        return answersFromResponses.stream()
                .map(answer -> createAnswerDto(answer, question))
                .collect(Collectors.toList());
    }

    @Override
    public QuestionType getQuestionType() {
        return QuestionType.MATRIX;
    }

    private AnswerDto createAnswerDto(SurveyAnswer surveyAnswer, Question question) {
        AnswerDto answerDto = new AnswerDto();

        answerDto.setValue(getAnswer(surveyAnswer, question));
        answerDto.setSubQuestionTitle(getSubQuestion(surveyAnswer, question));
        answerDto.setScore(getScore(question, surveyAnswer.getChoiceId()));

        return answerDto;
    }

    private String getAnswer(SurveyAnswer surveyAnswer, Question question) {
        if (surveyAnswer.getText() != null) {
            return surveyAnswer.getText();
        } else if (surveyAnswer.getChoiceId() != null) {
            return getChoice(question, surveyAnswer.getChoiceId());
        } else {
            return "";
        }
    }

    private String getSubQuestion(SurveyAnswer surveyAnswer, Question question) {
        if (surveyAnswer.getOtherId() != null) {
            return getOther(question, surveyAnswer.getOtherId());
        } else if (surveyAnswer.getRowId() != null) {
            return getRow(question, surveyAnswer.getRowId());
        } else {
            return "";
        }
    }

    private String getRow(Question question, String id) {
        return question.getAnswers().get(0).getRows().stream().filter(row -> row.getId().equals(id)).map(Row::getText).findFirst().orElse("");
    }

    private String getChoice(Question question, String id) {
        return question.getAnswers().get(0).getChoices().stream().filter(choice -> choice.getId().equals(id)).map(Choice::getText).findFirst().orElse("UNKNOWN CHOICE");
    }

    private String getOther(Question question, String id) {
        return id.equals(question.getAnswers().get(0).getOther().getId()) ? question.getAnswers().get(0).getOther().getText() : "";
    }

    private int getScore(Question question, String id) {
        return question.getAnswers().get(0).getChoices().stream().filter(choice -> choice.getId().equals(id)).map(Choice::getWeight).findFirst().orElse(0);
    }
}
