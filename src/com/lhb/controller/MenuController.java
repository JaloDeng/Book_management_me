package com.lhb.controller;

import java.util.List;
import java.util.Map;

import com.lhb.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/menu")
public class MenuController {

		@Autowired
		private MenuService menuService;
		
		@RequestMapping(value = "/getMenu")
		@ResponseBody
		public List<Map<String, Object>> getMenu(){	

			return menuService.getMenu();
		}
		

	}
	


