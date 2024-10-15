package com.joy.portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.joy.portfolio.entity.AboutMe;

public interface AboutMeRepository extends JpaRepository<AboutMe, String> {

}