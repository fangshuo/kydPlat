
package com.kyd.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;



public class EnCoding implements Filter {

	private String _Coding;
	public void destroy() {
		_Coding=null;
		
	}

	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chian) throws IOException, ServletException {
		req.setCharacterEncoding("UTF-8");
		//res.setContentType( "text/html;charset=GBK");
		//res.setCharacterEncoding(_Coding);
		chian.doFilter(req, res);
	}

	public void init(FilterConfig filterConfig) throws ServletException {
		_Coding = filterConfig.getInitParameter("Coding");
		
	}
	
   
	  

}
