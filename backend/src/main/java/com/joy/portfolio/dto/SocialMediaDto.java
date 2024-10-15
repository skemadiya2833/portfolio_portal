package com.joy.portfolio.dto;

import com.joy.portfolio.annotation.ValidUrl;
import com.joy.portfolio.enums.SocialMediaName;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SocialMediaDto {

	@NotNull(message = "Enter Valid Social Media Name")
	@Enumerated(EnumType.STRING)
	private SocialMediaName name;

	@NotBlank(message = "URL should not be empty")
	@ValidUrl
	@Size(max=255, message = "URL length should be less than 256")
	private String url;
}