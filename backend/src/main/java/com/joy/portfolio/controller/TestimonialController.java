package com.joy.portfolio.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.joy.portfolio.dto.TestimonialDto;
import com.joy.portfolio.entity.Testimonial;
import com.joy.portfolio.service.JWTService;
import com.joy.portfolio.service.TestimonialService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/user/testimonial")
public class TestimonialController {

	@Autowired
	private TestimonialService testimonialService;

	@Autowired
	private JWTService jwtService;

	@PostMapping()
	public ResponseEntity<Testimonial> addTestimonial(HttpServletRequest request,
			@RequestBody @Valid TestimonialDto testimonialDto) {
		String userId = jwtService.extractUserId(request);
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(testimonialService.addTestimonial(testimonialDto, userId));
	}

	@PutMapping("/{id}")
	public ResponseEntity<Testimonial> updateTestimonial(HttpServletRequest request, @PathVariable("id") String id,
			@RequestBody @Valid TestimonialDto testimonialDto) {
		String userId = jwtService.extractUserId(request);
		return ResponseEntity.ok(testimonialService.updateTestimonial(id, testimonialDto, userId));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Map<String, String>> removeTestimonial(@PathVariable("id") String id) {
		testimonialService.removeTestimonial(id);
		Map<String, String> response = new HashMap<>();
		response.put("id", id);
		return ResponseEntity.ok(response);
	}
}