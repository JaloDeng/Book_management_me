package com.lhb.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.lhb.util.JsonDateSerializer;

@Entity
@Table(name = "bookdetailview")
public class BookDetailViewModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	// id自增长
	private Integer id;
	@Column(name = "book_name")
	private String bookName;
	private String author;
	private String detail;
	private Double price;
	private String brief;
	private Integer amount;
	private String isbn;
	@JsonSerialize(using = JsonDateSerializer.class)
	private Date createTime;
	private Boolean isLoan;
	private String path;
	private String fileName;
	@Column(name = "booktype_id")
	private Integer booktypeId;
	
	public Integer getBooktypeId() {
		return booktypeId;
	}

	public void setBooktypeId(Integer booktypeId) {
		this.booktypeId = booktypeId;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getBookName() {
		return bookName;
	}

	public void setBookName(String bookName) {
		this.bookName = bookName;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getDetail() {
		return detail;
	}

	public void setDetail(String detail) {
		this.detail = detail;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public String getBrief() {
		return brief;
	}

	public void setBrief(String brief) {
		this.brief = brief;
	}

	public Integer getAmount() {
		return amount;
	}

	public void setAmount(Integer amount) {
		this.amount = amount;
	}



	public String getIsbn() {
		return isbn;
	}

	public void setIsbn(String isbn) {
		this.isbn = isbn;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Boolean getIsLoan() {
		return isLoan;
	}

	public void setIsLoan(Boolean isLoan) {
		this.isLoan = isLoan;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

}
