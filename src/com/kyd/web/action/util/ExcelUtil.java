package com.kyd.web.action.util;

import java.io.IOException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import jxl.Workbook;
import jxl.format.Alignment;
import jxl.format.UnderlineStyle;
import jxl.write.Label;
import jxl.write.WritableCellFormat;
import jxl.write.WritableFont;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;

/**
 * 导出excel
 * @author zhoufeng
 *
 */
public class ExcelUtil {
	
	 /**
     * 根据传来的值自动生成Excel文件并提供下载
     *
     * @param fileName  Excel文件名
     * @param sheetName 第一个sheet的名字 标题
     * @param tabName   表头标题的List，元素为String
     * @param content   内容的List，元素为String的List
     */
	public static void outExcel(HttpServletResponse response,String fileName, String sheetName, List tabName, List content)
	{
		WritableWorkbook workbook = null;
	   	 try
	   	 {
	   		    fileName = URLEncoder.encode(fileName, "UTF-8");
	            response.setContentType("application/vnd.ms-excel;charset=GBK");
	            response.setHeader("Content-disposition",
	                    "attachment;filename=" + fileName + ".xls");
	            
	            workbook = Workbook.createWorkbook(response.getOutputStream());
	            WritableSheet sheet = workbook.createSheet(sheetName, 0);
	            
	            
	            WritableCellFormat formatTop = new WritableCellFormat();
	            //构造格式：ARIAL字体、10号、粗体、非斜体、无下划线、黑色
	            WritableFont topFont = new WritableFont(WritableFont.ARIAL, 10, WritableFont.BOLD,
	                    false, UnderlineStyle.NO_UNDERLINE, jxl.format.Colour.BLACK);
	            formatTop.setFont(topFont);
	            
	            WritableCellFormat format = new WritableCellFormat();
	            format.setAlignment(Alignment.RIGHT);
	            
	            Map widthMap = new HashMap();//用于统计每一列的最大宽度
	            for (int a = 0; a < tabName.size(); a++) 
	            {
	                String tab = tabName.get(a).toString();
	                sheet.addCell(new Label(a, 0, tab, formatTop));
	                if(widthMap.get(Integer.toString(a))!=null)//如果已记录本列宽度
	                {
	                    int width = Integer.parseInt(widthMap.get(Integer.toString(a)).toString());//获得记录的宽度
	                    if(tab.length()*2>width)//如果当前插入的值的宽度大于记录的最大宽度，实际宽度为字符串长度乘与2
	                    {
	                        widthMap.put(Integer.toString(a),Integer.toString(tab.length()*2));//则替换该宽度
	                    }
	                } else //如果该列未记录宽度 
	                {
	                    widthMap.put(Integer.toString(a),Integer.toString(tab.length()*2));
	                }
	            }
	            
	            for (int b = 0; b < content.size(); b++) 
	            {
	                List list = (List) content.get(b);
	                for (int c = 0; c < list.size(); c++) 
	                {
	                    String con = "";
	                    if(list.get(c)!=null)
	                    {
	                    	con = list.get(c).toString();
	                    }
	                    
	                    sheet.addCell(new Label(c, b + 1, con,format));
	                    if(widthMap.get(Integer.toString(c))!=null)//如果已记录本列宽度
	                    {
	                        int width = Integer.parseInt(widthMap.get(Integer.toString(c)).toString());//获得记录的宽度
	                        if(con.length()*2>width)
	                        {//如果当前插入的值的宽度大于记录的最大宽度，实际宽度为字符串长度乘与2
	                            widthMap.put(Integer.toString(c),Integer.toString(con.length()*2));//则替换该宽度
	                        }
	                    }else 
	                    {//如果该列未记录宽度
	                        widthMap.put(Integer.toString(c),Integer.toString(con.length()*2));
	                    }
	                }
	            }
	            for(int d = 0;d < sheet.getColumns();d ++)
	            {
	                String colNum = Integer.toString(d);
	                int colWidth = Integer.parseInt(widthMap.get(colNum).toString());
	                sheet.setColumnView(d,colWidth);
	            }
	            workbook.write();
	   	 }catch(Exception e)
	   	 {
	   		 e.printStackTrace(); 
	   	 } finally 
	   	 {
	            if (workbook != null) 
	            {
	                try 
	                {
	                    workbook.close();
	                } catch (IOException e) 
	                {
	                    e.printStackTrace();
	                }catch (WriteException e) {
	                	 e.printStackTrace();
	                }
	            }
	      }
	}
}
