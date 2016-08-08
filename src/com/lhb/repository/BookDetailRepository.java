package com.lhb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lhb.model.BookDetailModel;

/**
 * Created by lihuibin on 2015/9/8.
 */
@Repository
public interface BookDetailRepository extends JpaRepository<BookDetailModel,Integer>{
	public BookDetailModel findByBookName(String bookName);
//	public BookDetailModel findByIsbn(String isbn);
}
