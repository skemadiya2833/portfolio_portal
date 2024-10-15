package com.joy.portfolio.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
public class Contact {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private String id;

	@Column(nullable = false, length=35)
	private String emailId;

	@Column(nullable = false)
	private String phoneNo;

	@Column(nullable = false)
	private String address;

	@OneToOne
	@JoinColumn(name = "user_id", nullable = false)
	@JsonBackReference(value = "user-contact")
	private User user;
}