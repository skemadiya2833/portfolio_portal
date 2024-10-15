package com.joy.portfolio.validator;

import java.util.Arrays;

import org.passay.LengthRule;
import org.passay.PasswordData;
import org.passay.PasswordValidator;
import org.passay.RuleResult;
import org.passay.SpecialCharacterRule;
import org.passay.WhitespaceRule;

import com.joy.portfolio.annotation.ValidPassword;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordConstraintValidator implements ConstraintValidator<ValidPassword, String> {

	@Override
	public void initialize(ValidPassword validPassword) {
	}

	@Override
	public boolean isValid(String password, ConstraintValidatorContext constraintValidatorContext) {
		PasswordValidator passwordValidator = new PasswordValidator(
				Arrays.asList(new LengthRule(8, 20), new SpecialCharacterRule(1), new WhitespaceRule()));
		RuleResult result = passwordValidator.validate(new PasswordData(password));
		if (result.isValid()) {
			return true;
		}
		constraintValidatorContext.disableDefaultConstraintViolation();
		constraintValidatorContext
				.buildConstraintViolationWithTemplate(String.join(",", passwordValidator.getMessages(result)))
				.addConstraintViolation();
		return false;
	}
}