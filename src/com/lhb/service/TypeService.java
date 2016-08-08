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

import com.lhb.model.TypeModel;
import com.lhb.repository.TypeRepository;

@Service
@Transactional
public class TypeService {

	@Autowired
	private TypeRepository typeRepository;

	// public List<TypeModel> getType() {
	//
	// List<TypeModel> listType = typeRepository.findAll();
	//
	// return listType;
	// }

	public Map<String, Object> getType(Integer page, Integer limit, String detail) { // 获得视图的信息
		page = page - 1;
		List<TypeModel> typeModel = new ArrayList<TypeModel>();
		Page<TypeModel> pagebean = null;
		long total = 0;
		if (detail == null) {
			PageRequest pageRequest = new PageRequest(page, limit);
			pagebean = typeRepository.findAll(pageRequest);
			typeModel = pagebean.getContent();
			total = pagebean.getTotalElements();
		} else {
			typeModel = typeRepository.findByDetailLike("%" + detail + "%");
			total = typeModel.size();
		}
		// List<BookViewModel> bookview = bookviewRepository.findAll();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("items", typeModel);
		map.put("total", total);
		return map;
	}

	public void test() { // junit测试

		TypeModel typeModel = typeRepository.findOne(1);
		System.out.println("type1: " + typeModel.getDetail());

	}

	public Map<String, Object> addType(Integer id, String detail) {
		TypeModel isExistId = typeRepository.findById(id);// 查询相同的id
		if (isExistId != null) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("success", false);
			map.put("msg", "已存在相同序号，无法执行添加操作！");// 通过msg来传递信息
			return map;
		}
		TypeModel isExistDetail = typeRepository.findByDetail(detail);
		if (isExistDetail != null) {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("success", false);
			map.put("msg", "已存在相同学科，无法执行添加操作！");
			return map;
		}
		// List<BookViewModel> bookview = bookviewRepository.findAll();
		TypeModel typeModel = new TypeModel();// 创建一行新的数据
		typeModel.setId(id);
		typeModel.setDetail(detail);
		typeRepository.save(typeModel);
		// System.out.println(bookModel.getId());
		// System.out.println(bookModel.getType_id());
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("data", typeModel);
		map.put("success", true);
		return map;
	}

	public Map<String, Object> editType(Integer id, String detail) {
		TypeModel typeModel = typeRepository.findOne(id);// 搜素选中的id，并对其数据进行覆盖
		typeModel.setDetail(detail);
		typeRepository.save(typeModel);
		TypeModel typeView = typeRepository.findOne(typeModel.getId());// 获取其id值
		Map<String, Object> map = new HashMap<String, Object>();// 获取数据库其id的内容
		map.put("data", typeView);
		map.put("success", true);
		return map;
	}

	public Map<String, Object> loadType(Integer id) {
		// BookModel bookModel =bookRepository.findOne(id);
		TypeModel typeModel = typeRepository.findOne(id);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("data", typeModel);
		map.put("success", true);
		return map;
	}

	public boolean deleteType(Integer s[]) {
		for (int i = 0; i < s.length; i++) {
			typeRepository.delete(s[i]);
		}
		return true;
	}

}
