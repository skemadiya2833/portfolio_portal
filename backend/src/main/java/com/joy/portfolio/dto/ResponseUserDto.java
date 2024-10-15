package com.joy.portfolio.dto;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.joy.portfolio.entity.AboutMe;
import com.joy.portfolio.entity.Contact;
import com.joy.portfolio.entity.Project;
import com.joy.portfolio.entity.Skill;
import com.joy.portfolio.entity.SocialMedia;
import com.joy.portfolio.entity.Testimonial;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResponseUserDto {

	@JsonProperty("id")
	String id;

	@JsonProperty("firstName")
	String firstName;

	@JsonProperty("lastName")
	String lastName;

	@JsonProperty("emailId")
	String emailId;

	@JsonProperty("username")
	String username;

	@JsonProperty("portfolioUrl")
	String portfolioUrl;

	@JsonProperty("aboutMe")
	private AboutMe aboutMe;

	@JsonProperty("skills")
	private List<Skill> allSkill = new ArrayList<>();

	@JsonProperty("projects")
	private List<Project> allProject = new ArrayList<>();

	@JsonProperty("testimonials")
	private List<Testimonial> allTestimonial = new ArrayList<>();

	@JsonProperty("contact")
	private Contact contact;

	@JsonProperty("socialMedias")
	private List<SocialMedia> allSocialMedia = new ArrayList<>();
}