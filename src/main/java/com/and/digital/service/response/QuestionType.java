package com.and.digital.service.response;

public enum QuestionType {
    SINGLE_CHOICE("single_choice"),
    MULTIPLE_CHOICE("multiple_choice"),
    OPEN_ENDED("open_ended"),
    DATETIME,
    PRESENTATION,
    MATRIX,
    DEMOGRAPHIC;

    private final String value;

    QuestionType(final String value) {
        this.value = value;
    }

    QuestionType() {
        this.value = "default";
    }

    public static QuestionType fromString(final String text) {
        for (QuestionType b : QuestionType.values()) {
            if (b.value.equalsIgnoreCase(text)) {
                return b;
            }
        }
        return null;
    }
}
