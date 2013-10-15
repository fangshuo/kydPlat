package com.kyd.web.action.login;

import java.text.SimpleDateFormat;
import java.util.Map;

import org.apache.log4j.Logger;

import com.kyd.model.User;
import com.kyd.util.SecurityUtils;
import com.kyd.web.action.base.BaseAction;
import com.opensymphony.xwork2.ActionContext;

/**
 * @author yeeku.H.lee kongyeeku@163.com
 * @version 1.0 <br>
 *          Copyright (C), 2005-2008, yeeku.H.Lee <br>
 *          This program is protected by copyright laws. <br>
 *          Program Name: <br>
 *          Date:
 */

public class LoginAction extends BaseAction {
	private static final Logger logger =Logger.getLogger(LoginAction.class);
	private String user;
	private String pass;
	private String vercode;
	private boolean success; // json的success属性，必须有，否则报语法错误
	private String message; // json的报错信息，必须有
	@Override
	public String execute() throws Exception {
		Map session = ActionContext.getContext().getSession();
		// String ver2 = (String )session.get("rand");
		String ver2 = (String) session.get("validate_code");
		if (vercode.equals(ver2)) {
			int userId = userManagerService.loginValid(user,SecurityUtils.encryptPassword(pass));
			if (userId > 0) {
				// 根据用户ID获取用户信息
				User userVo = userManagerService.getUser(user);
				SimpleDateFormat formatter = new SimpleDateFormat(
						"yyyy-MM-dd HH:mm:ss");
				java.util.Date currentTime = new java.util.Date();// 得到当前系统时间
				String xttime = formatter.format(currentTime); // 将日期时间格式化
				// session.put(Constans.USER_KEY, uservo);
				session.put("user", user);
				session.put("xttime", xttime);
				session.put("userVo", userVo);
				success = true;
				message = "登陆成功！";
				logger.info("登陆成功！");

			} else {
				success = false;
				message = "用户名/密码不匹配！";
				addActionError("用户名/密码不匹配"); // 错误信息提示，标签类
			}
		} else {
			success = false;
			message = "验证码不匹配,请重新输入！";
			addActionError("验证码不匹配,请重新输入");// 错误信息提示，标签类
		}
		return SUCCESS;
		// return "failure";
	}

	public String logout() {
		Map session = ActionContext.getContext().getSession();
		session.remove("userVo");
		session.remove("user");
		session.remove("xttime");
		return INPUT;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getUser() {
		return this.user;
	}

	public void setPass(String pass) {
		this.pass = pass;
	}

	public String getPass() {
		return this.pass;
	}

	public void setVercode(String vercode) {
		this.vercode = vercode;
	}

	public String getVercode() {
		return this.vercode;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}