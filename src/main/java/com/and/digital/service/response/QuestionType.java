package com.and.digital.service.response;

public enum QuestionType {
    SINGLE_CHOICE("single_choice"),
    MULTIPLE_CHOICE("multiple_choice"),
    OPEN_ENDED("open_ended"),
    MATRIX("matrix");

    private final String value;

    QuestionType(final String value) {
        this.value = value;
    }
    
    public static QuestionType fromString(final String text) {
        for (QuestionType type : QuestionType.values()) {
            if (type.value.equalsIgnoreCase(text)) {
                return type;
            }
        }
        return null;
    }
}
