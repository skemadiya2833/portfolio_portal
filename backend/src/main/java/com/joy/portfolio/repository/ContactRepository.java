package com.joy.portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.joy.portfolio.entity.Contact;

public interface ContactRepository extends JpaRepository<Contact, String> {

}