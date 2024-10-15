package com.joy.portfolio.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ContactDto {

	@NotBlank(message = "EmailId must not be empty")
	@Size(max = 35, message="Email Id length should be less than 36")
	@Email(regexp = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9-.]+\\.[a-zA-Z0-9-]+$", message = "Email Id is not valid")
	private String emailId;

	@NotBlank(message = "Phone Number must not be empty")
	@Pattern(regexp = "^[6-9]\\d{9}$", message = "Invalid Phone Number")
	private String phoneNo;

	@NotBlank(message = "Address must not be empty")
	@Size(max = 255, message="Address length should be less than 256")
	private String address;
}