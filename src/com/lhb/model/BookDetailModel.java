package com.lhb.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.lhb.util.JsonDateSerializer;

import javax.persistence.*;

import java.util.Date;

/**
 * Created by lihuibin on 2015/9/8.
 */
@Entity
@Table(name = "bookdetail")
public class BookDetailModel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@Column(name = "book_name")
	private String bookName;
	private String author;
	@Column(name = "booktype_id")
	private Integer booktypeId;
	private Double price;
	private String brief;
	private Integer amount;
	private String isbn;
	@JsonSerialize(using = JsonDateSerializer.class)
	private Date createTime;
	private Boolean isLoan;
	private String path;
	private String fileName;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getBookName() {
		return bookName;
	}

	public void setBookName(String bookName) {
		this.bookName = bookName;
	}

	public Integer getBooktypeId() {
		return booktypeId;
	}

	public void setBooktypeId(Integer booktypeId) {
		this.booktypeId = booktypeId;
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
