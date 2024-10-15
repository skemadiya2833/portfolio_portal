package com.joy.portfolio.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class TestimonialDto {

	@NotBlank(message = "Name must not be empty")
	@Size(max = 35, message = "Name length should be less than 36")
	private String name;

	@NotBlank(message="Designation must not be empty")
	@Size(max = 35, message = "Designation length should be less than 36")
	private String designation;

	@NotBlank(message="Description must not be empty")
	private String description;

	@Min(0)
	@Max(5)
	private int rating;
}