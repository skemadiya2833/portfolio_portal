package com.joy.portfolio.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.joy.portfolio.dto.EntityReorderDto;
import com.joy.portfolio.dto.ProjectDataDto;
import com.joy.portfolio.dto.ProjectDataResponseDto;
import com.joy.portfolio.entity.Image;
import com.joy.portfolio.entity.Project;
import com.joy.portfolio.entity.ProjectData;
import com.joy.portfolio.exception.DataNotFoundException;
import com.joy.portfolio.mapper.ProjectDataMapper;
import com.joy.portfolio.repository.ImageRepository;
import com.joy.portfolio.repository.ProjectDataRepository;
import com.joy.portfolio.repository.ProjectRepository;

import jakarta.transaction.Transactional;

@Service
public class ProjectDataService {

	@Autowired
	ProjectDataRepository projectDataRepository;

	@Autowired
	ImageRepository imageRepository;

	@Autowired
	ProjectRepository projectRepository;

	@Autowired
	ProjectDataMapper projectDataMapper;

	public ProjectDataResponseDto findByProjectIdAndUsername(String projectId, String username) {
		
		Project project = projectRepository.findByIdAndUsername(projectId, username).orElseThrow(()->new DataNotFoundException("Project Not Found"));	
		List<ProjectData> projectData = projectDataRepository.findByProjectId(projectId);
		ProjectDataResponseDto projectDataResponseDto = new ProjectDataResponseDto(project.getName(), projectData);
		return projectDataResponseDto;
	}

	public ProjectData addProjectData(ProjectDataDto projectDataDto) throws IOException {
		MultipartFile image = projectDataDto.getImage();
		Image projectDataImage = new Image(image.getOriginalFilename(), image.getContentType(), image.getBytes());
		projectDataImage = imageRepository.save(projectDataImage);
		ProjectData projectData = projectDataMapper.mapDtoToProjectData(projectDataDto);
		projectData.setImage(projectDataImage);
		int lastOrderNumber = projectDataRepository.getLastOrderNumber(projectData.getProject().getId()).orElse(-1);
		projectData.setProjectDataOrder(lastOrderNumber + 1);
		return projectDataRepository.save(projectData);
	}

	public ProjectData updateProjectData(String id, ProjectDataDto projectDataDto) throws IOException {
		ProjectData projectData = projectDataRepository.findById(id)
				.orElseThrow(() -> new DataNotFoundException("Project Data Not Found"));
		String oldImageId = projectData.getImage().getId();
		MultipartFile image = projectDataDto.getImage();
		Image projectDataImage = new Image(image.getOriginalFilename(), image.getContentType(), image.getBytes());
		projectDataImage = imageRepository.save(projectDataImage);
		projectData = projectDataMapper.mapDtoToProjectData(projectDataDto);
		projectData.setId(id);
		projectData.setImage(projectDataImage);
		projectData = projectDataRepository.save(projectData);
		imageRepository.deleteById(oldImageId);
		return projectData;
	}

	@Transactional
	public void reorderProjectData(EntityReorderDto entityReorderDto) {
		int lastOrderNumber = projectDataRepository.getLastOrderNumber(entityReorderDto.getSuperEntityId()).orElse(-1);
		if (entityReorderDto.getSuperEntityId() == null || entityReorderDto.getSuperEntityId().trim().length() == 0)
			throw new IllegalArgumentException("Project Id must not be empty");
		if (entityReorderDto.getOldOrderNumber() > lastOrderNumber
				|| entityReorderDto.getNewOrderNumber() > lastOrderNumber)
			throw new IllegalArgumentException("Invalid Order Number");
		if(entityReorderDto.getOldOrderNumber() == entityReorderDto.getNewOrderNumber()) return;
		projectDataRepository.updateAllProjectDataOrderBeforeReordering(entityReorderDto.getOldOrderNumber(),
				entityReorderDto.getNewOrderNumber(), entityReorderDto.getEntityId(),
				entityReorderDto.getSuperEntityId());
		projectDataRepository.updateSingleProjectDataOrder(entityReorderDto.getNewOrderNumber(),
				entityReorderDto.getEntityId());
	}

	@Transactional
	public void removeProjectData(String id) {
		ProjectData projectData = projectDataRepository.findById(id)
				.orElseThrow(() -> new DataNotFoundException("Project Data Not Found"));
		projectDataRepository.deleteById(id);
		projectDataRepository.updateAllProjectDataOrderAfterRemoval(projectData.getProjectDataOrder(),
				projectData.getProject().getId());
	}
}