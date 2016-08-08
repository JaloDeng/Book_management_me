package com.lhb.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="tree_menu")
public class MenuModel{
	@Id
	public Integer id;
	public String menuName;
	public Integer nodeID;
	public String path;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getMenuName() {
		return menuName;
	}
	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}
	public Integer getNodeID() {
		return nodeID;
	}
	public void setNodeID(Integer nodeID) {
		this.nodeID = nodeID;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	
	
	
}