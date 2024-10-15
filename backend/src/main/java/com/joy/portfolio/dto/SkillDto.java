package com.joy.portfolio.dto;

import com.joy.portfolio.enums.SkillType;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SkillDto {

	@NotBlank(message = "Skill name must not be empty")
	@Size(max = 35, message = "Skill name length should be less than 36")
	private String name;

	@NotNull(message = "Enter valid skill type")
	@Enumerated(EnumType.STRING)
	private SkillType skillType;

	@Min(1)
	@Max(100)
	private int proficiency;

	@NotBlank(message = "Description must not be empty")
	private String description;
}