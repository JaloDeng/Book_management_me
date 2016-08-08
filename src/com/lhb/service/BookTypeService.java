package com.lhb.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lhb.model.BookTypeModel;
import com.lhb.repository.BookTypeRepository;

@Service
@Transactional
public class BookTypeService {

	@Autowired
	private BookTypeRepository bookTypeRepositiry;
	
	 public List<BookTypeModel> getBookType() {
	
	 List<BookTypeModel> listType = bookTypeRepositiry.findAll();
	
	 return listType;
	 }
	

}
