package com.joy.portfolio.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Data;

@Entity
@Data
public class Testimonial {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private String id;

	@Column(nullable = false, length = 35)
	private String name;

	@Column(nullable = false, length = 35)
	private String designation;

	@Lob
	@Column(nullable = false, columnDefinition = "LONGTEXT")
	private String description;

	@Min(0)
	@Max(5)
	@Column(columnDefinition = "Integer default 0")
	private int rating;

	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	@JsonBackReference(value = "user-testimonial")
	private User user;
}