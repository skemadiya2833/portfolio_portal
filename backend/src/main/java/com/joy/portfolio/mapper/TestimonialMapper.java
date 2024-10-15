package com.joy.portfolio.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import com.joy.portfolio.dto.TestimonialDto;
import com.joy.portfolio.entity.Testimonial;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface TestimonialMapper {
	TestimonialMapper INSTANCE = Mappers.getMapper(TestimonialMapper.class);

	Testimonial mapDtoToTestimonial(TestimonialDto testimonialDto);
}