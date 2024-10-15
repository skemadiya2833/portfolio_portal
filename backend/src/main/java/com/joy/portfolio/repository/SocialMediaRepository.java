package com.joy.portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.joy.portfolio.entity.SocialMedia;

public interface SocialMediaRepository extends JpaRepository<SocialMedia, String> {

	@Modifying
	@Query("DELETE from SocialMedia socialMedia where socialMedia.id=:id")
	void deleteById(String id);
}