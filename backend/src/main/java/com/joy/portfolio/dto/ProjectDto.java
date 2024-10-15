package com.joy.portfolio.dto;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.joy.portfolio.annotation.ValidFile;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ProjectDto {

	@NotBlank(message = "Project name must not be empty")
	@Size(max=35, message="Project name length should be less than 36")
	private String name;

	@NotBlank(message = "Brief Detail must not be empty")
	private String briefDetail;

	@JsonIgnore
	@ValidFile(fileType = "image/", message = "Invalid Image Type or Image size is larger than 1 MB")
	private MultipartFile image;
}