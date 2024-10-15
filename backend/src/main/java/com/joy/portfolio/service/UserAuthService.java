package com.joy.portfolio.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.joy.portfolio.constants.PortfolioURL;
import com.joy.portfolio.dto.LoginDto;
import com.joy.portfolio.dto.LoginResponseDto;
import com.joy.portfolio.dto.RegisterDto;
import com.joy.portfolio.entity.User;
import com.joy.portfolio.mapper.UserMapper;
import com.joy.portfolio.repository.UserRepository;

@Service
public class UserAuthService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JWTService jwtService;

	@Autowired
	private UserMapper userMapper;

	@Transactional
	public void register(RegisterDto registerDto) {
		User user = userMapper.mapDtoToUser(registerDto);
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setPortfolioUrl(PortfolioURL.url + user.getUsername());
		userRepository.save(user);
	}

	public LoginResponseDto login(LoginDto loginDto) {
		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getLoginId(), loginDto.getPassword()));
		User user = (User) authentication.getPrincipal();
		Map<String, Object> extraClaims = new HashMap<>();
		extraClaims.put("userId", user.getId());
		String jwtToken = jwtService.generateToken(extraClaims, user);
		return new LoginResponseDto(user.getId(), jwtToken, user.getFirstName(), user.getPortfolioUrl());
	}
}