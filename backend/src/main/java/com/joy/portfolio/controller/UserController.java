package com.joy.portfolio.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.joy.portfolio.dto.ResponseUserDto;
import com.joy.portfolio.service.JWTService;
import com.joy.portfolio.service.UserService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private JWTService jwtService;

	@GetMapping()
	public ResponseEntity<ResponseUserDto> getUser(HttpServletRequest request) {
		String id = jwtService.extractUserId(request);
		return ResponseEntity.ok(userService.getUser(id));
	}

	@GetMapping("/portfolio/{username}")
	public ResponseEntity<ResponseUserDto> getUserFromUsername(@PathVariable("username") String username) {
		return ResponseEntity.ok(userService.getUserFromUsername(username));
	}

	@PostMapping("/logout")
	public ResponseEntity<Void> logoutUser(HttpServletRequest request) {
		jwtService.blacklistToken(request);
		return ResponseEntity.ok().build();
	}
}