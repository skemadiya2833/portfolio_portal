package com.joy.portfolio.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.joy.portfolio.dto.AboutMeDto;
import com.joy.portfolio.entity.AboutMe;
import com.joy.portfolio.entity.Image;
import com.joy.portfolio.entity.User;
import com.joy.portfolio.exception.DataNotFoundException;
import com.joy.portfolio.mapper.AboutMeMapper;
import com.joy.portfolio.repository.AboutMeRepository;
import com.joy.portfolio.repository.ImageRepository;

@Service
public class AboutMeService {

	@Autowired
	AboutMeRepository aboutMeRepository;

	@Autowired
	ImageRepository imageRepository;

	@Autowired
	AboutMeMapper aboutMeMapper;

	public AboutMe addAboutMe(AboutMeDto aboutMeDto, String userId) throws IOException {
		MultipartFile profile = aboutMeDto.getImage();
		Image profileImage = new Image(profile.getOriginalFilename(), profile.getContentType(), profile.getBytes());
		profileImage = imageRepository.save(profileImage);
		AboutMe aboutMe = aboutMeMapper.mapDtoToAboutMe(aboutMeDto);
		aboutMe.setImage(profileImage);
		User user = new User();
		user.setId(userId);
		aboutMe.setUser(user);
		return aboutMeRepository.save(aboutMe);
	}

	public AboutMe updateAboutMe(String id, AboutMeDto aboutMeDto, String userId) throws IOException {
		AboutMe aboutMe = aboutMeRepository.findById(id)
				.orElseThrow(() -> new DataNotFoundException("AboutMe Not Found"));
		String oldProfileId = aboutMe.getImage().getId();
		MultipartFile profile = aboutMeDto.getImage();
		Image profileImage = new Image(profile.getOriginalFilename(), profile.getContentType(), profile.getBytes());
		profileImage = imageRepository.save(profileImage);
		aboutMe = aboutMeMapper.mapDtoToAboutMe(aboutMeDto);
		aboutMe.setId(id);
		aboutMe.setImage(profileImage);
		User user = new User();
		user.setId(userId);
		aboutMe.setUser(user);
		aboutMe = aboutMeRepository.save(aboutMe);
		imageRepository.deleteById(oldProfileId);
		return aboutMe;
	}
}