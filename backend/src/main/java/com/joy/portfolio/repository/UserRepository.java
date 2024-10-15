package com.joy.portfolio.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.joy.portfolio.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

	Optional<User> findByEmailId(String emailId);

	Optional<User> findByUsername(String username);
}