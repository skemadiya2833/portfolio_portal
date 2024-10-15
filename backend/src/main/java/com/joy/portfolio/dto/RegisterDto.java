package com.joy.portfolio.dto;

import com.joy.portfolio.annotation.ValidPassword;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterDto {

	@NotBlank(message = "First Name must not be empty")
	@Pattern(regexp = "^[a-zA-Z]+$", message = "First name must only contain alphabetic characters")
	@Size(max = 17, message = "Firstname length should be less than 18")
	String firstName;

	@Pattern(regexp = "^[a-zA-Z]+$", message = "Last name must only contain alphabetic characters")
	@Size(max = 17, message = "Lastname length should be less than 18")
	String lastName;

	@NotBlank(message = "Email Id must not be empty")
	@Email(regexp = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9-.]+\\.[a-zA-Z0-9-]+$", message = "Email Id is not valid")
	@Size(max = 35, message = "EmailId length should be less than 36")
	String emailId;

	@NotBlank(message = "Username must not be empty")
	@Pattern(regexp = "^[a-zA-Z0-9]+$", message = "Username must only contain alphabetic or numeric characters")
	@Size(min = 6, max = 16, message="Username length should be greater than 5 and less than 17")
	String username;

	@NotBlank(message = "Password must should not be empty")
	@ValidPassword
	String password;
}