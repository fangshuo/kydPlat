package com.kyd.web.action.base;

import com.kyd.service.xtgl.IUserManagerService;
import com.opensymphony.xwork2.ActionSupport;

/**
 * @author yeeku.H.lee kongyeeku@163.com
 * @version 1.0 <br>
 *          Copyright (C), 2005-2008, yeeku.H.Lee <br>
 *          This program is protected by copyright laws. <br>
 *          Program Name: <br>
 *          Date:
 */

public class BaseAction extends ActionSupport {
	/**
	 * 
	 */
	private static final long serialVersionUID = -5362768091213580853L;
	protected IUserManagerService userManagerService;

	public void setUserManagerService(IUserManagerService userManagerService) {
		this.userManagerService = userManagerService;
	}

	
}