package com.lhb.controller;

import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lhb.service.BookDetailService;
//import com.sun.org.apache.xerces.internal.impl.xpath.regex.ParseException;

/**
 * Created by lihuibin on 2015/9/11.
 */
@Controller
@RequestMapping(value = "/bookdetail")
public class BookDetailController {

	@Autowired
	private BookDetailService bookDetailService;

	@RequestMapping(value = "/getBookDetail")
	@ResponseBody
	public Map<String, Object> getBookDetail(Integer page, Integer limit, String text, Integer query_type)
			throws UnsupportedEncodingException {
		System.out.println("NNNNNNNNNN");
		if (text != null) {
			text = new String(text.getBytes("ISO-8859-1"), "UTF-8"); // ("GB2312"),"8859-1");
		}
		System.out.println("NNNNNNNNNN" + text);
		return bookDetailService.getBookDetail(page, limit, text, query_type);
	}

	@RequestMapping(value = "/addBookDetail")
	@ResponseBody
	public Map<String, Object> addBookDetail(Integer id, String bookName, String author, Integer booktypeId,
			Double price, String brief, Integer amount, String isbn, String createTime, Boolean isLoan) {
		Date createTimeChanged = new Date();
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		try {
			createTimeChanged = format.parse(createTime);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return bookDetailService.addBookDetail(id, bookName, author, booktypeId, price, brief, amount, isbn,
				createTimeChanged, isLoan);
	}

	@RequestMapping(value = "/editBookDetail")
	@ResponseBody
	public Map<String, Object> editBookDetail(Integer id, String bookName, String author, Integer booktypeId,
			Double price, String brief, Integer amount, String isbn, String createTime, Boolean isLoan) {
		Date createTimeChanged = new Date();
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		try {
			createTimeChanged = format.parse(createTime);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return bookDetailService.editBookDetail(id, bookName, author, booktypeId, price, brief, amount, isbn,
				createTimeChanged, isLoan);
	}

	@RequestMapping(value = "/loadBookDetail")
	@ResponseBody
	public Map<String, Object> loadBookDetail(Integer id) {
		// System.out.println("mmmmmmmmmmm"+id);
		return bookDetailService.loadBookDetail(id);
	}

	@RequestMapping(value = "/deleteBookDetail")
	@ResponseBody
	public boolean deleteBookDetail(Integer id[]) {
		// System.out.println("DDDDDDDDD"+id[0]);
		return bookDetailService.deleteBookDetail(id);
	}
}
