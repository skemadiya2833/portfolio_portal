package com.joy.portfolio.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Image {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private String id;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private String type;

	@Lob
	@Column(name = "image_data", length = 10485760)
	private byte[] imageData;

	public Image(String name, String type, byte[] imageData) {
		this.name = name;
		this.type = type;
		this.imageData = imageData;
	}
}