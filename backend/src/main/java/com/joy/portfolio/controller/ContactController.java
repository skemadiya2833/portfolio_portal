package com.joy.portfolio.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.joy.portfolio.dto.ContactDto;
import com.joy.portfolio.entity.Contact;
import com.joy.portfolio.service.ContactService;
import com.joy.portfolio.service.JWTService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/user/contact")
public class ContactController {

	@Autowired
	ContactService contactService;

	@Autowired
	JWTService jwtService;

	@PostMapping()
	public ResponseEntity<Contact> addContact(HttpServletRequest request, @RequestBody @Valid ContactDto contactDto) {
		String userId = jwtService.extractUserId(request);
		return ResponseEntity.status(HttpStatus.CREATED).body(contactService.addContact(contactDto, userId));
	}

	@PutMapping("/{id}")
	public ResponseEntity<Contact> updateContact(HttpServletRequest request, @PathVariable("id") String id,
			@RequestBody @Valid ContactDto contactDto) {
		String userId = jwtService.extractUserId(request);
		return ResponseEntity.ok(contactService.updateContact(id, contactDto, userId));
	}
}