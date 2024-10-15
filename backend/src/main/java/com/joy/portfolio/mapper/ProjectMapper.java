package com.joy.portfolio.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import com.joy.portfolio.dto.ProjectDto;
import com.joy.portfolio.entity.Project;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface ProjectMapper {

	ProjectMapper INSTANCE = Mappers.getMapper(ProjectMapper.class);

	Project mapDtoToProject(ProjectDto projectDto);
}