package com.kyd.web.action.xtgl;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.kyd.service.xtgl.IJiaoSePzService;
import com.opensymphony.xwork2.ActionSupport;

public class JiaoSePzAction extends ActionSupport {

	private String sjjsdm;
	private String sjjsmc;
	private String jsdm;
	private String jsmc;
	private String jslx;

	private List jiaoSeTreeList = new ArrayList();
	private List menuTreeList = new ArrayList();

	protected IJiaoSePzService jiaoSePzService;

	/**
	 * 设置响应类型，获取输出流，
	 * 
	 * @return
	 * @throws Exception
	 */
	public PrintWriter getWriter() throws Exception {
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setContentType("text/html;charset=UTF-8");
		PrintWriter out = response.getWriter();
		return out;
	}

	/**
	 * 初始化方法
	 * 
	 * @return
	 * @throws Exception
	 */
	public String initPage() throws Exception {
		return SUCCESS;

	}

	/**
	 * 获取角色树
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getJiaoSeTree() throws Exception {

		String id = ServletActionContext.getRequest().getParameter("id");
		HashMap map = new HashMap();
		map.put("gnsid", id);
		jiaoSeTreeList = jiaoSePzService.getTree(map, "0");
		return SUCCESS;
	}

	/**
	 * 获取功能菜单树
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getMenuTree() throws Exception {
		String gnsid = ServletActionContext.getRequest().getParameter("id");
		String jsdm = ServletActionContext.getRequest().getParameter("jsid");
		HashMap map = new HashMap();
		map.put("gnsid", gnsid);
		map.put("jsdm", jsdm);
		menuTreeList = jiaoSePzService.getTree(map, "1");
		return SUCCESS;
	}

	/**
	 * 保存，修改，删除对应的角色
	 * 
	 * @return
	 */

	public String savaOrDele() throws Exception {
		List list = new ArrayList();
		HashMap map = null;
		PrintWriter out = this.getWriter();

		String handleCode = ServletActionContext.getRequest().getParameter(
				"handleCode");

		String jsdm = ServletActionContext.getRequest().getParameter("jsdm");
		String jdmc = ServletActionContext.getRequest().getParameter("jsmc");
		String leaf = ServletActionContext.getRequest().getParameter("leaf");

		if ("saveData".equals(handleCode)) {
			HashMap datamap = new HashMap();
			datamap.put("jsdm", jsdm);
			datamap.put("sjjsdm", sjjsdm);
			datamap.put("jsmc", jsmc);
			datamap.put("jslx", jslx);
			datamap.put("xybj", "1");
			list.add(datamap);
			map = jiaoSePzService.saveData(list, jsdm);
		} else if ("delData".equals(handleCode)) {
			map = jiaoSePzService.delData(jsdm, leaf);
		} else if ("changeData".equals(handleCode)) {
			map = jiaoSePzService.changeData(jsdm, jdmc, leaf);
		}

		out.print("{success:" + (String) map.get("success") + ",msg:'"
				+ (String) map.get("msg") + "'}");
		out.flush();
		out.close();
		return SUCCESS;
	}

	/**
	 * 保存用户配置的角色与菜单关系
	 * 
	 * @return
	 * @throws Exception
	 */
	public String submitData() throws Exception {
		String menuid = ServletActionContext.getRequest()
				.getParameter("menuid");
		String jsid = ServletActionContext.getRequest().getParameter("jsid");

		String[] menuArray = menuid.split(",");
		ArrayList reqList = new ArrayList();
		for (int i = 0; i < menuArray.length; i++) {
			HashMap datamap = new HashMap();
			datamap.put("jsid", jsid);
			datamap.put("menuid", menuArray[i]);
			reqList.add(datamap);

		}

		HashMap map = jiaoSePzService.submitData(reqList, jsid);

		PrintWriter out = this.getWriter();
		out.print("{success:" + (String) map.get("success") + ",msg:'"
				+ (String) map.get("msg") + "'}");
		out.flush();
		out.close();
		return SUCCESS;

	}

	public IJiaoSePzService getJiaoSePzService() {
		return jiaoSePzService;
	}

	public void setJiaoSePzService(IJiaoSePzService jiaoSePzService) {
		this.jiaoSePzService = jiaoSePzService;
	}

	public List getJiaoSeTreeList() {
		return jiaoSeTreeList;
	}

	public void setJiaoSeTreeList(List jiaoSeTreeList) {
		this.jiaoSeTreeList = jiaoSeTreeList;
	}

	public List getMenuTreeList() {
		return menuTreeList;
	}

	public void setMenuTreeList(List menuTreeList) {
		this.menuTreeList = menuTreeList;
	}

	public String getSjjsdm() {
		return sjjsdm;
	}

	public void setSjjsdm(String sjjsdm) {
		this.sjjsdm = sjjsdm;
	}

	public String getSjjsmc() {
		return sjjsmc;
	}

	public void setSjjsmc(String sjjsmc) {
		this.sjjsmc = sjjsmc;
	}

	public String getJsdm() {
		return jsdm;
	}

	public void setJsdm(String jsdm) {
		this.jsdm = jsdm;
	}

	public String getJsmc() {
		return jsmc;
	}

	public void setJsmc(String jsmc) {
		this.jsmc = jsmc;
	}

	public String getJslx() {
		return jslx;
	}

	public void setJslx(String jslx) {
		this.jslx = jslx;
	}

}
