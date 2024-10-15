package com.joy.portfolio.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import com.joy.portfolio.dto.SkillDto;
import com.joy.portfolio.entity.Skill;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface SkillMapper {

	SkillMapper INSTANCE = Mappers.getMapper(SkillMapper.class);

	Skill mapDtoToSkill(SkillDto skillDto);
}