package com.joy.portfolio.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.joy.portfolio.enums.SkillType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Skill {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private String id;

	@Column(nullable = false, length = 35)
	private String name;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private SkillType skillType;

	@Column(nullable = false, columnDefinition = "Integer default '1'")
	@Min(1)
	@Max(100)
	private int proficiency;

	@Lob
	@Column(nullable = false, columnDefinition = "LONGTEXT")
	private String description;

	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	@JsonBackReference(value = "user-skill")
	private User user;
}