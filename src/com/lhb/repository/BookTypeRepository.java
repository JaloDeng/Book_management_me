package com.lhb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lhb.model.BookTypeModel;

@Repository
public interface BookTypeRepository extends JpaRepository<BookTypeModel, Integer>{
	
}