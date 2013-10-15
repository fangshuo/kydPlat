package com.kyd.util;

import java.io.File;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.apache.struts2.ServletActionContext;

import com.kyd.dao.util.ReadProperties;

public class AccessConn {

	private static AccessConn constants = new AccessConn();


	/**
	 * 得到实例
	 * 
	 * @return
	 */
	public static AccessConn getInstance() {
		return constants;
	}

	public static Connection getConn() {
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		String sql = null;

		try {
			Class.forName("sun.jdbc.odbc.JdbcOdbcDriver") ;
		} catch (ClassNotFoundException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

		String url = "d:/DB_ALLFUNCTION";
		File f = new File(url);
		System.out.println(f.getAbsoluteFile());

		String strurl = "jdbc:odbc:driver={Microsoft Access Driver (*.mdb)};DBQ=d:/DB_ALLFUNCTION";
		try {
			conn = DriverManager.getConnection(strurl);// 打开数据库的连接
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return conn;
	}
	
	public static Connection getRmiConn() {
		java.sql.Connection c = null;
		String webPath=ServletActionContext.getServletContext().getRealPath("/");
		ReadProperties  properties = new ReadProperties(webPath+"WEB-INF\\info.properties");

		String driverClassName = properties.getProperty("jdbc.driverClassName");
		String strurl = properties.getProperty("jdbc.url");
		String userName = properties.getProperty("jdbc.username");
		String passWord = properties.getProperty("jdbc.password");
		 try {
		      // 注册数据提供程序
		      Class.forName(driverClassName).newInstance();
		      // 数据链接字符串
		      c = DriverManager.getConnection(strurl, "", "");
		    } catch(Exception e) {
		      e.printStackTrace();
		    }
		    return c;
		  }
	
	public static void main(String[] args){
		Statement stmt;
		try {
			stmt = AccessConn.getConn().createStatement();
	
		String sql = "select f1,f2 from jl_czjl ";// 查询大集中dbf文件的列的信息
		ResultSet rs = stmt.executeQuery(sql);
		while (rs.next()) {
			 System.out.println(rs.getString("f1"));
		}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
