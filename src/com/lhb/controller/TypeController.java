package com.lhb.controller;

import java.io.UnsupportedEncodingException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lhb.service.TypeService;

@Controller
@RequestMapping("/book")
public class TypeController {

	@Autowired
	private TypeService typeService;
	
//	@RequestMapping("/getType")
//	@ResponseBody
//	public List<TypeModel>getType(){
//		return typeService.getType();
//	}
	
	@RequestMapping(value="/getType")
	@ResponseBody
	public Map<String,Object> getType(Integer page,Integer limit,String detail) throws UnsupportedEncodingException {
		if(detail!=null){
			detail=new String(detail.getBytes("ISO-8859-1"),"UTF-8"); //("GB2312"),"8859-1");
		}
//		System.out.println("NNNNNNNNNN"+detail);
		return typeService.getType(page,limit,detail);
	} 
	
	@RequestMapping(value="/addType")
	@ResponseBody
	public Map<String,Object> addType(Integer id,String detail){

		return typeService.addType(id,detail);
	}
	
	@RequestMapping(value="/editType")
	@ResponseBody
	public Map<String,Object> editType(Integer id,String detail){
//		System.out.println("lll"+id+"hhh"+detail);
		return typeService.editType(id, detail);
	}
	
	@RequestMapping(value="/loadType")
	@ResponseBody
	public Map<String,Object> loadType(Integer id){
//		System.out.println("mmmmmmmmmmm"+id);
		return typeService.loadType(id);
	}
	
	@RequestMapping(value="/deleteType")
	@ResponseBody
	public boolean deleteType(Integer id[]){
//		System.out.println("DDDDDDDDD"+id[0]);
		return typeService.deleteType(id);
	}
	
	
}
