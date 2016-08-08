package com.lhb.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lhb.model.MenuModel;
import com.lhb.repository.MenuRepository;

@Service
@Transactional(readOnly = true)//readOnly=true表明所注解的方法或类只是读取数据,readOnly=false表明所注解的方法或类是增加，删除，修改数据。
public class MenuService{
	
	@Autowired
	private MenuRepository menuRepository;

	public List<Map<String, Object>> getMenu() {

		List<Map<String,Object>> menuList = new ArrayList<Map<String,Object>>();
		
		List<MenuModel> menu = menuRepository.findAll();//获取tree_menu全部数据
		
		for(MenuModel mmodel : menu){
			if(mmodel.getNodeID()==0){     //父节点
				Map<String,Object> parentMap = new HashMap<String,Object>();
				parentMap.put("id", mmodel.getId());
				parentMap.put("text",mmodel.getMenuName());
				parentMap.put("value",mmodel.getPath());
				parentMap.put("leaf", false);
		
				List<Map<String,Object>> childrenListMap = new ArrayList<Map<String,Object>>();
				for(MenuModel childs : menu){
				if(childs.getNodeID()==mmodel.getId()){      //子节点
					Map<String,Object> childMap = new HashMap<String, Object>();
					childMap.put("id", childs.getId());
					childMap.put("text",childs.getMenuName());
					childMap.put("value",childs.getPath());
					childMap.put("leaf", true);
					childrenListMap.add(childMap);
				}

			}
				parentMap.put("children", childrenListMap);
				menuList.add(parentMap);
		}
			}
		return menuList;
	}
}
	


