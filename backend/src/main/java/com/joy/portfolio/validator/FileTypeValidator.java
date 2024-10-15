package com.joy.portfolio.validator;

import org.springframework.web.multipart.MultipartFile;

import com.joy.portfolio.annotation.ValidFile;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class FileTypeValidator implements ConstraintValidator<ValidFile, MultipartFile> {

	private String fileType;
	private final long MAX_FILE_SIZE = 1048576;

	@Override
	public void initialize(ValidFile validFile) {
		this.fileType = validFile.fileType();
	}

	@Override
	public boolean isValid(MultipartFile file, ConstraintValidatorContext context) {
		return file.getContentType() != null && file.getContentType().startsWith(fileType)
				&& file.getSize() <= MAX_FILE_SIZE;
	}
}