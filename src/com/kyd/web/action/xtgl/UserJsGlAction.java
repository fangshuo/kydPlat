package com.kyd.web.action.xtgl;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.kyd.service.xtgl.IUserJsGlService;
import com.opensymphony.xwork2.ActionSupport;

public class UserJsGlAction extends ActionSupport {

	private List userTreeList = new ArrayList();
	private List jiaoSeTreeList = new ArrayList();

	protected IUserJsGlService userJsGlService;

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
	 * 获取用户树
	 * 
	 * @return
	 * @throws Exception
	 */
	public String getUserTree() throws Exception {
		String id = ServletActionContext.getRequest().getParameter("id");
		HashMap map = new HashMap();
		map.put("id", id);
		userTreeList = userJsGlService.getTree(map, "0");
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
		String userid = ServletActionContext.getRequest()
				.getParameter("userid");
		HashMap map = new HashMap();
		map.put("id", id);
		map.put("userid", userid);
		jiaoSeTreeList = userJsGlService.getTree(map, "1");
		return SUCCESS;
	}

	/**
	 * 保存用户与角色关系
	 * 
	 * @return
	 * @throws Exception
	 */
	public String submitData() throws Exception {
		String userid = ServletActionContext.getRequest()
				.getParameter("userid");
		String jsid = ServletActionContext.getRequest().getParameter("jsid");

		String[] jsArray = jsid.split(",");
		ArrayList reqList = new ArrayList();
		for (int i = 0; i < jsArray.length; i++) {
			HashMap datamap = new HashMap();
			datamap.put("userid", userid);
			datamap.put("jsid", jsArray[i]);
			reqList.add(datamap);

		}

		HashMap map = userJsGlService.submitData(reqList, userid);

		PrintWriter out = this.getWriter();
		out.print("{success:" + (String) map.get("success") + ",msg:'"
				+ (String) map.get("msg") + "'}");
		out.flush();
		out.close();
		return SUCCESS;

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

	public IUserJsGlService getUserJsGlService() {
		return userJsGlService;
	}

	public void setUserJsGlService(IUserJsGlService userJsGlService) {
		this.userJsGlService = userJsGlService;
	}

	public List getUserTreeList() {
		return userTreeList;
	}

	public void setUserTreeList(List userTreeList) {
		this.userTreeList = userTreeList;
	}

	public List getJiaoSeTreeList() {
		return jiaoSeTreeList;
	}

	public void setJiaoSeTreeList(List jiaoSeTreeList) {
		this.jiaoSeTreeList = jiaoSeTreeList;
	}
}
