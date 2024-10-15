package com.joy.portfolio.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.joy.portfolio.dto.ProjectDto;
import com.joy.portfolio.entity.Project;
import com.joy.portfolio.service.JWTService;
import com.joy.portfolio.service.ProjectService;
import com.joy.portfolio.validator.DtoValidator;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/user/project")
public class ProjectController {

	@Autowired
	ObjectMapper objectMapper;

	@Autowired
	DtoValidator dtoValidator;

	@Autowired
	ProjectService projectService;

	@Autowired
	JWTService jwtService;

	@PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE })
	public ResponseEntity<Project> addProject(HttpServletRequest request, @RequestPart String projectData,
			@RequestPart("image") MultipartFile image) throws IOException {
		ProjectDto projectDto = objectMapper.readValue(projectData, ProjectDto.class);
		projectDto.setImage(image);
		dtoValidator.validate(projectDto);
		String userId = jwtService.extractUserId(request);
		return ResponseEntity.status(HttpStatus.CREATED).body(projectService.addProject(projectDto, userId));
	}

	@PutMapping(value = "/{id}", consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE })
	public ResponseEntity<Project> updateProject(HttpServletRequest request, @PathVariable("id") String id,
			@RequestPart String projectData, @RequestPart("image") MultipartFile image) throws IOException {
		ProjectDto projectDto = objectMapper.readValue(projectData, ProjectDto.class);
		projectDto.setImage(image);
		dtoValidator.validate(projectDto);
		String userId = jwtService.extractUserId(request);
		return ResponseEntity.ok(projectService.updateProject(id, projectDto, userId));
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Map<String, String>> removeProject(@PathVariable("id") String id) {
		projectService.removeProject(id);
		Map<String, String> response = new HashMap<String, String>();
		response.put("id", id);
		return ResponseEntity.ok(response);
	}
}