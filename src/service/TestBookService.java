package service;

import org.junit.Test;
import org.junit.runner.RunWith;

import com.lhb.service.BookService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath*:com/lhb/resource/spring-base.xml" })
public class TestBookService extends AbstractJUnit4SpringContextTests {

	@Autowired
	private BookService bookService;


	@Test
	public void test() {

		bookService.test();

	}
}
