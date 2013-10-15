package com.kyd.dao.util;

import java.io.FileInputStream;
import java.util.Properties;

public class ReadProperties extends Properties {
	
	private static final long serialVersionUID = 1L;
	Properties prop = new Properties();

	 public ReadProperties(String path) { //带参的构造函数
	  try 
	  {
		  FileInputStream fis = new FileInputStream(path);
		  prop.load(fis);
		  fis.close();
	  } 
	  catch (Exception e) 
	  {
		 e.printStackTrace();
	  }
	 }

	 public String getProperty(String key)
	 {
		 String val = (String) prop.getProperty(key);  //根据KEY值得到资源文件中的value值
		 return val; 
	 }
	 

}
