package com.joy.portfolio.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import com.joy.portfolio.dto.ProjectDataDto;
import com.joy.portfolio.entity.ProjectData;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface ProjectDataMapper {

	ProjectDataMapper INSTANCE = Mappers.getMapper(ProjectDataMapper.class);

	ProjectData mapDtoToProjectData(ProjectDataDto projectDataDto);
}