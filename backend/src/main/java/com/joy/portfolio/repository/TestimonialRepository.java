package com.joy.portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.joy.portfolio.entity.Testimonial;

public interface TestimonialRepository extends JpaRepository<Testimonial, String> {

	@Modifying
	@Query("DELETE from Testimonial testimonial where testimonial.id=:id")
	void deleteById(String id);
}