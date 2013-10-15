package com.kyd.util;

import java.text.DecimalFormat;
import java.text.ParseException;

public class StringUtil {
	
	   /**
	    * 将数字类型的字符串变成.00格式
	    * @param data
	    * @return
	    */
	   public static String toDoubleStr(String data)
	   {
			 try
			 {
				double fldj = 0;
				DecimalFormat df2  = new DecimalFormat("###.00");
				if(data!=null&&!"".equals(data))
				{
					fldj= Double.parseDouble(data);
				}
				return df2.format(fldj);
		   	}catch(Exception e)
		   	{
		    	 	e.printStackTrace();
		    	 	return null;
		    }
			
		   
	   }
}
