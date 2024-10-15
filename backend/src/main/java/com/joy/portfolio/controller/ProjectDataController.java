package com.joy.portfolio.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.joy.portfolio.dto.EntityReorderDto;
import com.joy.portfolio.dto.ProjectDataDto;
import com.joy.portfolio.dto.ProjectDataResponseDto;
import com.joy.portfolio.entity.ProjectData;
import com.joy.portfolio.service.JWTService;
import com.joy.portfolio.service.ProjectDataService;
import com.joy.portfolio.validator.DtoValidator;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/user")
public class ProjectDataController {

	@Autowired
	ObjectMapper objectMapper;

	@Autowired
	DtoValidator dtoValidator;

	@Autowired
	ProjectDataService projectDataService;

	@Autowired
	JWTService jwtService;

	@GetMapping("/portfolio/{username}/{projectId}")
	public ResponseEntity<ProjectDataResponseDto> findWithoutAuthentication(@PathVariable("username") String username,
			@PathVariable("projectId") String projectId) {
		return ResponseEntity.ok(projectDataService.findByProjectIdAndUsername(projectId, username));
	}

	@GetMapping("/projectData/{projectId}")
	public ResponseEntity<ProjectDataResponseDto> findWithAuthentication(HttpServletRequest request,
			@PathVariable("projectId") String projectId) {
		String token = request.getHeader("Authorization").substring(7);
		String username = jwtService.extractUsername(token);
		return ResponseEntity.ok(projectDataService.findByProjectIdAndUsername(projectId, username));
	}

	@PostMapping(value = "/projectData", consumes = { MediaType.APPLICATION_JSON_VALUE,
			MediaType.MULTIPART_FORM_DATA_VALUE })
	public ResponseEntity<ProjectData> addProjectData(@RequestPart String projectData,
			@RequestPart("image") MultipartFile image) throws IOException {
		ProjectDataDto projectDataDto = objectMapper.readValue(projectData, ProjectDataDto.class);
		projectDataDto.setImage(image);
		dtoValidator.validate(projectDataDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(projectDataService.addProjectData(projectDataDto));
	}

	@PutMapping(value = "/projectData/{id}", consumes = { MediaType.APPLICATION_JSON_VALUE,
			MediaType.MULTIPART_FORM_DATA_VALUE })
	public ResponseEntity<ProjectData> updateProjectData(@PathVariable("id") String id, @RequestPart String projectData,
			@RequestPart("image") MultipartFile image) throws IOException {
		ProjectDataDto projectDataDto = objectMapper.readValue(projectData, ProjectDataDto.class);
		projectDataDto.setImage(image);
		dtoValidator.validate(projectDataDto);
		return ResponseEntity.ok(projectDataService.updateProjectData(id, projectDataDto));
	}

	@PutMapping("/projectData/reorder")
	public ResponseEntity<Void> reorderProjectData(@RequestBody @Valid EntityReorderDto entityReorderDto) {
		projectDataService.reorderProjectData(entityReorderDto);
		return ResponseEntity.ok(null);
	}

	@DeleteMapping("/projectData/{id}")
	public ResponseEntity<Map<String, String>> removeProjectData(@PathVariable("id") String id) {
		projectDataService.removeProjectData(id);
		Map<String, String> response = new HashMap<String, String>();
		response.put("id", id);
		return ResponseEntity.ok(response);
	}
}