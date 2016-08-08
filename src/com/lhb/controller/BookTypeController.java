package com.lhb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lhb.model.BookTypeModel;
import com.lhb.service.BookTypeService;

@Controller
@RequestMapping("/bookType")
public class BookTypeController {

	@Autowired
	private BookTypeService bookTypeService;
	@RequestMapping("/getBookType")
	@ResponseBody
	public List<BookTypeModel>getBookType(){
		return bookTypeService.getBookType();
	}

	
	
}
