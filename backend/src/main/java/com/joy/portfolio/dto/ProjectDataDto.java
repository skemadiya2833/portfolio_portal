package com.joy.portfolio.dto;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.joy.portfolio.annotation.ValidFile;
import com.joy.portfolio.entity.Project;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ProjectDataDto {

	@NotBlank(message = "Heading must not be empty")
	@Size(max=35, message = "Heading length should be less than 36")
	private String heading;

	@NotBlank(message = "Description name must not be empty")
	private String description;

	@JsonIgnore
	@ValidFile(fileType = "image/", message = "Invalid Image Type or Image size is larger than 1 MB")
	private MultipartFile image;

	@NotNull
	private Project project;
}