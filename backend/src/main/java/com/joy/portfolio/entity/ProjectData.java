package com.joy.portfolio.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
public class ProjectData{

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private String id;

	@Column(nullable = false, length=35)
	private String heading;

	@Lob
	@Column(nullable = false, columnDefinition = "LONGTEXT")
	private String description;

	@OneToOne(cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
	@JoinColumn(name = "image_id")
	private Image image;
	
	@Column(columnDefinition = "Integer default '0'")
	private int projectDataOrder;

	@ManyToOne
	@JoinColumn(name = "project_id", nullable = false)
	@JsonBackReference(value = "project-projectData")
	private Project project;
}