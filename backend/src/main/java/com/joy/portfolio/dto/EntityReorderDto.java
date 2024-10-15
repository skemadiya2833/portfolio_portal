package com.joy.portfolio.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class EntityReorderDto {
	
	@NotBlank(message = "Entity id must not be empty")
	String entityId;
	
	String superEntityId;
	
	@NotNull
	@Min(0)
	int oldOrderNumber;
	
	@NotNull
	@Min(0)
	int newOrderNumber;
}