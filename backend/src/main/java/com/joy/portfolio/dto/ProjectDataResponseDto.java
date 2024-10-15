package com.joy.portfolio.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.joy.portfolio.entity.ProjectData;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProjectDataResponseDto {
	
	@JsonProperty("projectName")
	private String projectName;
	
	@JsonProperty("projectData")
	private List<ProjectData> projectData;
}
