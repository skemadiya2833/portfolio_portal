package com.joy.portfolio.validator;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Validator;

@Component
public class DtoValidator {

	@Autowired
	private Validator validator;

	public <T> void validate(T dtoObject) {
		Set<ConstraintViolation<T>> violations = validator.validate(dtoObject);
		if (!violations.isEmpty()) {
			throw new ConstraintViolationException(violations);
		}
	}
}