package com.kyd.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;

/**
 *  日期工具类
 * @author zhoufeng
 *
 */
public class DateUtil {

	/**
	 *  将字符串类型的格式化成java.sql.Timestamp类型
	 * @param date
	 * @param gs
	 * @return
	 */
	public static java.sql.Timestamp  getTimestamp(String date)
	{
		 try
		 {
//			 DateFormat df = new SimpleDateFormat(gs);
//	         java.util.Date rq = df.parse(date); 
//	         java.sql.Timestamp d = new java.sql.Timestamp(rq.getTime());
//	         return d;
	         
	         java.sql.Timestamp returnVal = null;
	 		if( (date==null) || (date.trim().length()<1) ) return returnVal;
	         returnVal = new java.sql.Timestamp(  new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse( date ).getTime() );      
	         return returnVal;
	     }catch(ParseException e)
	     {
	    	 	e.printStackTrace();
	    	 	return null;
	     }
		
	}
}
