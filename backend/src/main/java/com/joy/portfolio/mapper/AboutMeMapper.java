package com.joy.portfolio.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import com.joy.portfolio.dto.AboutMeDto;
import com.joy.portfolio.entity.AboutMe;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface AboutMeMapper {

	AboutMeMapper INSTANCE = Mappers.getMapper(AboutMeMapper.class);

	AboutMe mapDtoToAboutMe(AboutMeDto aboutMeDto);
}