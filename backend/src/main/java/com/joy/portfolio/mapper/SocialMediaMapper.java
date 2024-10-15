package com.joy.portfolio.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import com.joy.portfolio.dto.SocialMediaDto;
import com.joy.portfolio.entity.SocialMedia;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface SocialMediaMapper {
	SocialMediaMapper INSTANCE = Mappers.getMapper(SocialMediaMapper.class);

	SocialMedia mapDtoToSocialMedia(SocialMediaDto socialMediaDto);
}