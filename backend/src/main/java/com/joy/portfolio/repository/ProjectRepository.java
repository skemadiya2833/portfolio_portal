package com.joy.portfolio.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.joy.portfolio.entity.Project;

public interface ProjectRepository extends JpaRepository<Project, String> {

	@Query("SELECT project from Project project WHERE project.id = :id AND project.user.username = :username")
	Optional<Project> findByIdAndUsername(String id, String username);

}