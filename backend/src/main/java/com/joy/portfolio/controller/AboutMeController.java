package com.joy.portfolio.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.joy.portfolio.dto.AboutMeDto;
import com.joy.portfolio.entity.AboutMe;
import com.joy.portfolio.service.AboutMeService;
import com.joy.portfolio.service.JWTService;
import com.joy.portfolio.validator.DtoValidator;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/user/aboutMe")
public class AboutMeController {

	@Autowired
	ObjectMapper objectMapper;

	@Autowired
	DtoValidator dtoValidator;

	@Autowired
	AboutMeService aboutMeService;

	@Autowired
	JWTService jwtService;

	@PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE })
	public ResponseEntity<AboutMe> addAboutMe(HttpServletRequest request, @RequestPart String aboutMeData,
			@RequestPart("image") MultipartFile image) throws IOException {
		AboutMeDto aboutMeDto = objectMapper.readValue(aboutMeData, AboutMeDto.class);
		aboutMeDto.setImage(image);
		dtoValidator.validate(aboutMeDto);
		String userId = jwtService.extractUserId(request);
		return ResponseEntity.status(HttpStatus.CREATED).body(aboutMeService.addAboutMe(aboutMeDto, userId));
	}

	@PutMapping(value = "/{id}", consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE })
	public ResponseEntity<AboutMe> updateAboutMe(HttpServletRequest request, @PathVariable("id") String id,
			@RequestPart String aboutMeData, @RequestPart("image") MultipartFile image) throws IOException {
		AboutMeDto aboutMeDto = objectMapper.readValue(aboutMeData, AboutMeDto.class);
		aboutMeDto.setImage(image);
		dtoValidator.validate(aboutMeDto);
		String userId = jwtService.extractUserId(request);
		return ResponseEntity.status(HttpStatus.OK).body(aboutMeService.updateAboutMe(id, aboutMeDto, userId));
	}
}
