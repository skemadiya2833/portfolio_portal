package com.joy.portfolio.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import com.joy.portfolio.dto.RegisterDto;
import com.joy.portfolio.dto.ResponseUserDto;
import com.joy.portfolio.entity.User;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface UserMapper {

	UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

	User mapDtoToUser(RegisterDto registerDto);

	ResponseUserDto mapUserToDto(User user);
}