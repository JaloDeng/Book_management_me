package com.lhb.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lhb.model.BookModel;
import com.lhb.model.BookViewModel;
import com.lhb.repository.BookRepository;
import com.lhb.repository.BookViewRepository;

@Service
@Transactional
public class BookService {
	@Autowired
	private BookRepository bookRepository;

	@Autowired
	private BookViewRepository bookviewRepository;
	
//	public List<BookViewModel> getAll() {
//
//		List<BookViewModel> listBookView = bookviewRepository.findAll();
//
//		return listBookView;
//	}
	
	public Map<String, Object> getAll(Integer page,Integer limit,String author) {        //获得视图的信息
		page =page-1;
		List<BookViewModel> bookviewModel = new ArrayList<BookViewModel>();
		Page<BookViewModel> pagebean = null;
		long total=0; 
		if(author==null){
			PageRequest pageRequest = new PageRequest(page, limit);
			pagebean = bookviewRepository.findAll(pageRequest);
			bookviewModel = pagebean.getContent();
			total = pagebean.getTotalElements();
		}
		else{
			bookviewModel = bookviewRepository.findByAuthorLike("%"+author+"%");
			total = bookviewModel.size();
		}
//		List<BookViewModel> bookview = bookviewRepository.findAll();
		Map<String, Object> map = new HashMap<String,Object>();
		map.put("items", bookviewModel);
		map.put("total", total);
		return map;
	}

	public void test() {          //junit测试

		BookViewModel bookviewModel = bookviewRepository.findOne(1);
		System.out.println("book1: "+bookviewModel.getBook_name());
		
	}

	public Map<String, Object> addbook(Integer id ,String book_name,String author,Integer type_id,Double price,String brief) {

//		List<BookViewModel> bookview = bookviewRepository.findAll();
		BookModel bookModel = new BookModel();
		bookModel.setId(id);
		bookModel.setBook_name(book_name);
		bookModel.setAuthor(author);
		bookModel.setType_id(type_id);
		bookModel.setPrice(price);
		bookModel.setBrief(brief);
		bookRepository.save(bookModel);
//		System.out.println(bookModel.getId());
//		System.out.println(bookModel.getType_id());
		
		BookModel bookview = bookRepository.findOne(bookModel.getId());
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("data", bookview);//也可使用map.put("data","book");
		map.put("success", true);
		return map;
	}

	public Map<String, Object> editbook(Integer id, String book_name,
			String author,String type_id, Double price, String brief) {
		BookModel bookmodel = bookRepository.findOne(id);
		BookModel bookModel = new BookModel();
		bookModel.setAuthor(author);
		bookModel.setBook_name(book_name);
		bookModel.setBrief(brief);
		bookModel.setId(id);
		bookModel.setPrice(price);
	
		if(type_id.equals("文科")||type_id.equals("理科")||type_id.equals("工科")){
		    int a=bookmodel.getType_id();
			bookModel.setType_id(a);
		}
		else 
//			bookModel.setType_id(Integer.parseInt(type_id));
			{bookModel.setType_id(Integer.parseInt(type_id));}
		bookRepository.save(bookModel);
//		if(detail.equals("文科")){
//		bookModel.setType_id(1);}
//		if(detail.equals("理科")){
//			bookModel.setType_id(2);}	
//		if(detail.equals("工科")){
//				bookModel.setType_id(3);}
//		System.out.println("oooooooooo"+bookModel.getType_id());
		BookModel bookview = bookRepository.findOne(bookModel.getId());
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("data", bookview);//
		map.put("success", true);
		return map;
	}

	public Map<String, Object> loadbook(Integer id) {
//		BookModel bookModel =bookRepository.findOne(id);
		BookViewModel bookviewModel = bookviewRepository.findOne(id);
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("data", bookviewModel);
		map.put("success", true);
		return map;
	}

	public boolean deleteBook(Integer s[]) {
		for(int i=0;i<s.length;i++){
			bookRepository.delete(s[i]);
		}
		return true;
	}

}
