package com.lhb.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.lhb.model.BookDetailViewModel;

@Repository
public interface BookDetailViewRepository extends JpaRepository<BookDetailViewModel, Integer>{
	List<BookDetailViewModel> findByBookNameLike(String bookName);
	List<BookDetailViewModel> findByAuthorLike(String author);
	List<BookDetailViewModel> findByBooktypeId(Integer booktypeId);
	List<BookDetailViewModel> findByPrice(Double price);
//	@Query("select o from BookDetailViewModel o where o.amount>=?1")
	List<BookDetailViewModel> findByAmount(Integer amount);
	List<BookDetailViewModel> findByIsbnLike(String isbn);
	@Query("select o from BookDetailViewModel o where o.createTime>=?1")
	List<BookDetailViewModel> findByCreateTime(Date createTime);
	List<BookDetailViewModel> findByBriefLike(String brief);
	List<BookDetailViewModel> findByIsLoan(Boolean isLoad);
}
