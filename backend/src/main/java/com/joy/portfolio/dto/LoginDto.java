package com.joy.portfolio.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LoginDto {

	@NotNull
	private String loginId;

	@NotNull
	private String password;
}