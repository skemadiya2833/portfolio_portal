package com.joy.portfolio.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.joy.portfolio.enums.SocialMediaName;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class SocialMedia {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private String id;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private SocialMediaName name;

	@Column(nullable = false)
	private String url;

	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	@JsonBackReference(value = "user-socialMedia")
	private User user;
}