package com.lhb.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lhb.model.BookDetailModel;
import com.lhb.model.BookDetailViewModel;
import com.lhb.repository.BookDetailRepository;
import com.lhb.repository.BookDetailViewRepository;

/**
 * Created by lihuibin on 2015/9/11.
 */
@Service
@Transactional
public class BookDetailService {

	@Autowired
	private BookDetailRepository bookDetailRepository;

	@Autowired
	private BookDetailViewRepository bookDetailViewRepository;

	public Map<String, Object> getBookDetail(Integer page, Integer limit, String text, Integer query_type) { // 获得视图的信息
		page = page - 1;
		List<BookDetailViewModel> bookDetailViewModel = new ArrayList<BookDetailViewModel>();
		Page<BookDetailViewModel> pagebean = null;
		Map<String, Object> map = new HashMap<String, Object>();
		long total = 0;
		if (text == null) {
			PageRequest pageRequest = new PageRequest(page, limit);
			pagebean = bookDetailViewRepository.findAll(pageRequest);
			bookDetailViewModel = pagebean.getContent();
			total = pagebean.getTotalElements();
		} else {
			if (query_type == 1) {
				bookDetailViewModel = bookDetailViewRepository.findByBookNameLike("%" + text + "%");
			} else if (query_type == 2) {
				bookDetailViewModel = bookDetailViewRepository.findByAuthorLike("%" + text + "%");
			} else if(query_type==3){
				if(text.equals("文学")){
					bookDetailViewModel = bookDetailViewRepository.findByBooktypeId(1);			
				}else if(text.equals("理学")) {
					bookDetailViewModel = bookDetailViewRepository.findByBooktypeId(2);
				}else if(text.equals("工学")) {
					bookDetailViewModel = bookDetailViewRepository.findByBooktypeId(3);
				}
			} else if (query_type == 4) {
				bookDetailViewModel = bookDetailViewRepository.findByPrice(Double.valueOf(text));
			} else if (query_type == 5) {
				bookDetailViewModel = bookDetailViewRepository.findByAmount(Integer.valueOf(text));
			} else if (query_type == 6) {
				bookDetailViewModel = bookDetailViewRepository.findByIsbnLike("%" + text + "%");
			} else if(query_type==7){
				Date date = new Date();
				SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
				try {
					date = format.parse(text);
				} catch (ParseException e) {
					e.printStackTrace();
				}
				bookDetailViewModel=bookDetailViewRepository.findByCreateTime(date);
			} else if (query_type == 8) {
				bookDetailViewModel = bookDetailViewRepository.findByBriefLike("%" + text + "%");				
			} else if (query_type == 9) {
				if(text.equals("是")) {
					bookDetailViewModel = bookDetailViewRepository.findByIsLoan(true);
				}else if (text.equals("否")) {
					bookDetailViewModel = bookDetailViewRepository.findByIsLoan(false);
				}
			}
		}

		map.put("items", bookDetailViewModel);
		map.put("total", total);

		return map;
	}

	public Map<String, Object> addBookDetail(Integer id, String bookName, String author, Integer booktypeId,
			Double price, String brief, Integer amount, String isbn, Date createTime, Boolean isLoan) {
		BookDetailModel isExistBookName = bookDetailRepository.findByBookName(bookName);
		if (isExistBookName != null) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("success", false);
			map.put("msg", "已存在相同书名，无法执行添加操作！");// 通过msg来传递信息
			return map;
		}
		// BookDetailModel isExistIsbn = bookDetailRepository.findByIsbn(isbn);
		// if (isExistIsbn != null) {
		// Map<String, Object> map = new HashMap<String, Object>();
		// map.put("success", false);
		// map.put("msg", "已存在相同ISBN号，无法执行添加操作！");//通过msg来传递信息
		// return map;
		// }
		BookDetailModel bookDetailModel = new BookDetailModel();
		bookDetailModel.setId(id);
		bookDetailModel.setBookName(bookName);
		bookDetailModel.setAuthor(author);
		bookDetailModel.setBooktypeId(booktypeId);
		bookDetailModel.setPrice(price);
		bookDetailModel.setBrief(brief);
		bookDetailModel.setAmount(amount);
		bookDetailModel.setIsbn(isbn);
		bookDetailModel.setCreateTime(createTime);
		bookDetailModel.setIsLoan(isLoan);
		bookDetailRepository.save(bookDetailModel);
		BookDetailModel bookDetailView = bookDetailRepository.findOne(bookDetailModel.getId());
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("data", bookDetailView);// 也可使用map.put("data","book");
		map.put("success", true);
		return map;
	}

	public Map<String, Object> editBookDetail(Integer id, String bookName, String author, Integer booktypeId,
			Double price, String brief, Integer amount, String isbn, Date createTime, Boolean isLoan) {
		BookDetailModel bookDetailModel = bookDetailRepository.findOne(id);
		// BookDetailModel bookDetailModel = new BookDetailModel();
		bookDetailModel.setBookName(bookName);
		bookDetailModel.setAuthor(author);
		bookDetailModel.setBooktypeId(booktypeId);
		bookDetailModel.setPrice(price);
		bookDetailModel.setBrief(brief);
		bookDetailModel.setAmount(amount);
		bookDetailModel.setIsbn(isbn);
		bookDetailModel.setCreateTime(createTime);
		bookDetailModel.setIsLoan(isLoan);
		// if(booktypeId.equals("文学")||booktypeId.equals("理学")||booktypeId.equals("工学")){
		// int a=bookDetailModel.getBooktypeId();
		// bookDetailModel.setBooktypeId(a);
		// }
		// else
		// {bookDetailModel.setBooktypeId(Integer.parseInt(booktypeId));}
		bookDetailRepository.save(bookDetailModel);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("data", bookDetailModel);
		map.put("success", true);
		return map;
	}

	public Map<String, Object> loadBookDetail(Integer id) {
		BookDetailViewModel bookDetailViewModel = bookDetailViewRepository.findOne(id);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("data", bookDetailViewModel);
		map.put("success", true);
		return map;
	}

	public boolean deleteBookDetail(Integer s[]) {
		for (int i = 0; i < s.length; i++) {
			bookDetailRepository.delete(s[i]);
		}
		return true;
	}

}
