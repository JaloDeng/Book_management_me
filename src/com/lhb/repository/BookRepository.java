package com.lhb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lhb.model.BookModel;

@Repository
public interface BookRepository extends JpaRepository<BookModel, Integer>{
	
	
}