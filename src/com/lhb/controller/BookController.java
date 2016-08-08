package com.lhb.controller;

import java.io.UnsupportedEncodingException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lhb.service.BookService;

@Controller
@RequestMapping(value="/book")
public class BookController {

	@Autowired
	private BookService bookService;
	
	@RequestMapping(value="/getBook")          
	@ResponseBody
//	public List<BookViewModel> getType(){
//		return bookService.getAll();
//	}
		
	public Map<String,Object> getAll(Integer page,Integer limit,String name) throws UnsupportedEncodingException{
		if(name!=null){
			name=new String(name.getBytes("ISO-8859-1"),"UTF-8"); //("GB2312"),"8859-1");
		}
		System.out.println("NNNNNNNNNN"+name);
		return bookService.getAll(page,limit,name);
	}
	
	@RequestMapping(value="/addBook")
	@ResponseBody
	public Map<String,Object> addbook(Integer id,String book_name,String author,Integer type_id,Double price,String brief){

		return bookService.addbook(id,book_name,author,type_id,price,brief);
	}
	
	@RequestMapping(value="/editBook")
	@ResponseBody
	public Map<String,Object> editbook(Integer id,String book_name,String author,String detail,Double price,String brief){
//		System.out.println("lll"+id+"hhh"+book_name+"bbbbbb"+author+"BBB"+detail+"CC"+price+"DD"+brief);
		return bookService.editbook(id, book_name, author, detail, price, brief);
	}
	
	@RequestMapping(value="/load")
	@ResponseBody
	public Map<String,Object> loadbook(Integer id){
//		System.out.println("mmmmmmmmmmm"+id);
		return bookService.loadbook(id);
	}
	
	@RequestMapping(value="/deleteBook")
	@ResponseBody
	public boolean deleteBook(Integer id[]){
//		System.out.println("DDDDDDDDD"+id[0]);
		return bookService.deleteBook(id);
	}
	
	
	
}
