package com.lhb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lhb.model.BookViewModel;

@Repository
public interface BookViewRepository extends JpaRepository<BookViewModel, Integer>{

	List<BookViewModel> findByAuthorLike(String author);
	List<BookViewModel> findByDetailLike(String detail);
}
