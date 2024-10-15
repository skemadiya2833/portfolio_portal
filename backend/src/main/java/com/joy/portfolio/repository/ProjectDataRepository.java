package com.joy.portfolio.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.joy.portfolio.entity.ProjectData;

public interface ProjectDataRepository extends JpaRepository<ProjectData, String> {

	@Query("SELECT projectData FROM ProjectData projectData WHERE projectData.project.id = :projectId ORDER BY projectData.projectDataOrder")
	List<ProjectData> findByProjectId(String projectId);

	@Query(value = "SELECT projectData.project_data_order FROM project_data projectData WHERE projectData.project_id = :projectId ORDER BY projectData.project_data_order DESC LIMIT 1", nativeQuery = true)
	Optional<Integer> getLastOrderNumber(String projectId);

	@Modifying
	@Query("UPDATE ProjectData projectData SET projectData.projectDataOrder = :projectDataOrder WHERE projectData.id = :id")
	void updateSingleProjectDataOrder(int projectDataOrder, String id);

	@Modifying
	@Query("UPDATE ProjectData projectData "
			+ "SET projectData.projectDataOrder = "
			+ "CASE "
			+ "WHEN projectData.projectDataOrder >= :newOrderNumber AND projectData.projectDataOrder < :oldOrderNumber THEN projectData.projectDataOrder+1 "
			+ "WHEN projectData.projectDataOrder <= :newOrderNumber AND projectData.projectDataOrder > :oldOrderNumber THEN projectData.projectDataOrder-1  "
			+ "ELSE projectData.projectDataOrder "
			+ "END "
			+ "WHERE projectData.id != :id AND projectData.project.id = :projectId")
	void updateAllProjectDataOrderBeforeReordering(int oldOrderNumber, int newOrderNumber, String id, String projectId);

	@Modifying
	@Query("UPDATE ProjectData projectData SET projectData.projectDataOrder = projectData.projectDataOrder-1 WHERE projectData.projectDataOrder >= :projectDataOrder AND projectData.project.id = :projectId")
	void updateAllProjectDataOrderAfterRemoval(int projectDataOrder, String projectId);
}