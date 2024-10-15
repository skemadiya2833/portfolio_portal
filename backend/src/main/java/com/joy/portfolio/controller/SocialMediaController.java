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

import com.joy.portfolio.dto.SocialMediaDto;
import com.joy.portfolio.entity.SocialMedia;
import com.joy.portfolio.service.JWTService;
import com.joy.portfolio.service.SocialMediaService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/user/socialMedia")
public class SocialMediaController {

	@Autowired
	private SocialMediaService socialMediaService;

	@Autowired
	private JWTService jwtService;

	@PostMapping()
	public ResponseEntity<SocialMedia> addSocialMedia(HttpServletRequest request,
			@RequestBody @Valid SocialMediaDto socialMediaDto) {
		String userId = jwtService.extractUserId(request);
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(socialMediaService.addSocialMedia(socialMediaDto, userId));
	}

	@PutMapping("/{id}")
	public ResponseEntity<SocialMedia> updateSocialMedia(HttpServletRequest request, @PathVariable("id") String id,
			@RequestBody @Valid SocialMediaDto socialMediaDto) {
		String userId = jwtService.extractUserId(request);
		return ResponseEntity.ok(socialMediaService.updateSocialMedia(id, socialMediaDto, userId));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Map<String, String>> removeSocialMedia(@PathVariable("id") String id) {
		socialMediaService.removeSocialMedia(id);
		Map<String, String> response = new HashMap<>();
		response.put("id", id);
		return ResponseEntity.ok(response);
	}
}