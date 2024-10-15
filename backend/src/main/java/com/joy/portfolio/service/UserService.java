package com.joy.portfolio.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.joy.portfolio.dto.ResponseUserDto;
import com.joy.portfolio.entity.User;
import com.joy.portfolio.exception.DataNotFoundException;
import com.joy.portfolio.mapper.UserMapper;
import com.joy.portfolio.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	UserRepository userRepository;

	@Autowired
	UserMapper userMapper;

	public ResponseUserDto getUser(String id) {
		User user = userRepository.findById(id).orElseThrow(() -> new DataNotFoundException("User Not Found"));
		ResponseUserDto responseUserDto = userMapper.mapUserToDto(user);
		return responseUserDto;
	}

	public ResponseUserDto getUserFromUsername(String username) {
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new DataNotFoundException("User Not Found"));
		ResponseUserDto responseUserDto = userMapper.mapUserToDto(user);
		return responseUserDto;
	}
}