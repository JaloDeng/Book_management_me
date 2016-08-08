package com.lhb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lhb.model.MenuModel;

@Repository
public interface MenuRepository extends JpaRepository<MenuModel, Integer>{
	
}
