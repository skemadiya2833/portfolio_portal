package com.joy.portfolio.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.joy.portfolio.validator.URLValidator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Target({ ElementType.FIELD, ElementType.ANNOTATION_TYPE, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = URLValidator.class)
public @interface ValidUrl {
	String message() default "Invalid URL";

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};
}