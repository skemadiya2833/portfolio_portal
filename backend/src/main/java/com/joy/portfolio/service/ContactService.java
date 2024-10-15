package com.joy.portfolio.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.joy.portfolio.dto.ContactDto;
import com.joy.portfolio.entity.Contact;
import com.joy.portfolio.entity.User;
import com.joy.portfolio.exception.DataNotFoundException;
import com.joy.portfolio.mapper.ContactMapper;
import com.joy.portfolio.repository.ContactRepository;

@Service
public class ContactService {

	@Autowired
	private ContactRepository contactRepository;

	@Autowired
	private ContactMapper contactMapper;

	public Contact addContact(ContactDto contactDto, String userId) {
		Contact contact = contactMapper.mapDtoToContact(contactDto);
		User user = new User();
		user.setId(userId);
		contact.setUser(user);
		return contactRepository.save(contact);
	}

	public Contact updateContact(String id, ContactDto contactDto, String userId) {
		if (!contactRepository.existsById(id))
			throw new DataNotFoundException("Contact Not Found");
		Contact contact = contactMapper.mapDtoToContact(contactDto);
		contact.setId(id);
		User user = new User();
		user.setId(userId);
		contact.setUser(user);
		return contactRepository.save(contact);
	}
}