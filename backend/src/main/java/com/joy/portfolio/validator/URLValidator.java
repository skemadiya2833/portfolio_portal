package com.joy.portfolio.validator;

import org.apache.commons.validator.routines.UrlValidator;

import com.joy.portfolio.annotation.ValidUrl;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class URLValidator implements ConstraintValidator<ValidUrl, String> {

	private String[] schemes = {"http","https"};
	private UrlValidator urlValidator = new UrlValidator(schemes);

	@Override
	public void initialize(ValidUrl validUrl) {
	}

	@Override
	public boolean isValid(String url, ConstraintValidatorContext context) {
		return urlValidator.isValid(url);
	}
}