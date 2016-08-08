package com.lhb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lhb.model.TypeModel;

@Repository
public interface TypeRepository extends JpaRepository<TypeModel, Integer> {
	// public Page<TypeModel> findAll(Specification<TypeModel> specification,
	// Pageable pageable);
	public TypeModel findById(Integer id);

	public TypeModel findByDetail(String detail);

	List<TypeModel> findByDetailLike(String detail);
}
