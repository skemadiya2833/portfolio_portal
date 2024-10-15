package com.joy.portfolio.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import com.joy.portfolio.dto.ContactDto;
import com.joy.portfolio.entity.Contact;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface ContactMapper {

	ContactMapper INSTANCE = Mappers.getMapper(ContactMapper.class);

	Contact mapDtoToContact(ContactDto contactDto);
}