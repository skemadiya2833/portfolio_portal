package com.joy.portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.joy.portfolio.entity.Skill;

public interface SkillRepository extends JpaRepository<Skill, String> {

	@Modifying
	@Query("DELETE from Skill skill where skill.id=:id")
	void deleteById(String id);
}