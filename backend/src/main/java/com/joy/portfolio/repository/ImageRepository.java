package com.joy.portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.joy.portfolio.entity.Image;

public interface ImageRepository extends JpaRepository<Image, String> {

}