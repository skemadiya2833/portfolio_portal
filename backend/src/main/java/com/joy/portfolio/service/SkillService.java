package com.joy.portfolio.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.joy.portfolio.dto.SkillDto;
import com.joy.portfolio.entity.Skill;
import com.joy.portfolio.entity.User;
import com.joy.portfolio.exception.DataNotFoundException;
import com.joy.portfolio.mapper.SkillMapper;
import com.joy.portfolio.repository.SkillRepository;

@Service
public class SkillService {

	@Autowired
	SkillRepository skillRepository;

	@Autowired
	SkillMapper skillMapper;

	public Skill addSkill(SkillDto skillDto, String userId) {
		Skill skill = skillMapper.mapDtoToSkill(skillDto);
		User user = new User();
		user.setId(userId);
		skill.setUser(user);
		return skillRepository.save(skill);
	}

	public Skill updateSkill(String id, SkillDto skillDto, String userId) {
		if (!skillRepository.existsById(id))
			throw new DataNotFoundException("Skill Not Found");
		Skill skill = skillMapper.mapDtoToSkill(skillDto);
		skill.setId(id);
		User user = new User();
		user.setId(userId);
		skill.setUser(user);
		return skillRepository.save(skill);
	}

	public void removeSkill(String id) {
		if (!skillRepository.existsById(id))
			throw new DataNotFoundException("Skill Not Found");
		skillRepository.deleteById(id);
	}
}