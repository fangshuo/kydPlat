package com.kyd.web.action.login;

import java.util.List;

import org.apache.struts2.ServletActionContext;

import com.kyd.model.User;
import com.kyd.service.xtgl.ITreeManagerService;
import com.opensymphony.xwork2.ActionSupport;

public class GetTreeAction extends ActionSupport {

	private List treeList;
	protected ITreeManagerService treeManagerService;

	public void setTreeManagerService(ITreeManagerService treeManagerService) {
		this.treeManagerService = treeManagerService;
	}

	public String getTree() throws Exception {
		String treeClick = ServletActionContext.getRequest().getParameter(
				"treeClick");
		String id = ServletActionContext.getRequest().getParameter("id");
		User vo = (User) ServletActionContext.getRequest().getSession()
				.getAttribute("userVo");

		treeList = treeManagerService.getTree(id, vo.getPid());
		return SUCCESS;
	}

	public List getTreeList() {
		return treeList;
	}

	public void setTreeList(List treeList) {
		this.treeList = treeList;
	}

}
