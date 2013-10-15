package com.kyd.model;

import java.io.Serializable;
/**
 * @author  yeeku.H.lee kongyeeku@163.com
 * @version  1.0
 * <br>Copyright (C), 2005-2008, yeeku.H.Lee
 * <br>This program is protected by copyright laws.
 * <br>Program Name:
 * <br>Date: 
 */
public class User implements Serializable
{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1425541007567647063L;
	private String pid;
	//标识属性
	private String user_id;
	
	//用户名属性
	private String user;
	private String users;
	//密码属性
	private String pass;
	//性别
	private int sex;
	//电子邮件属性
	private String email;
	//部门代码
	private String bmdm;
	//部门名称
	private String bmmc;
	
	
	//-------修改密码
	private String jpass;
	private String xpass;
	private String qrpass;
	
	private int start;
	private int limit;
	
	public int getStart() {
		return start;
	}
	public void setStart(int start) {
		this.start = start;
	}
	public int getLimit() {
		return limit;
	}
	public void setLimit(int limit) {
		this.limit = limit;
	}
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public void setUser(String user)
	{
		this.user = user;
	}
	public String getUser()
	{
		 return this.user;
	}

	public void setPass(String pass)
	{
		this.pass = pass;
	}
	public String getPass()
	{
		 return this.pass;
	}

	public void setEmail(String email)
	{
		this.email = email;
	}
	public String getEmail()
	{
		 return this.email;
	}
	public int getSex() {
		return sex;
	}
	public void setSex(int sex) {
		this.sex = sex;
	}
	public String getBmdm() {
		return bmdm;
	}
	public void setBmdm(String bmdm) {
		this.bmdm = bmdm;
	}
	public String getBmmc() {
		return bmmc;
	}
	public void setBmmc(String bmmc) {
		this.bmmc = bmmc;
	}
	public String getPid() {
		return pid;
	}
	public void setPid(String pid) {
		this.pid = pid;
	}
	public String getJpass() {
		return jpass;
	}
	public void setJpass(String jpass) {
		this.jpass = jpass;
	}
	public String getXpass() {
		return xpass;
	}
	public void setXpass(String xpass) {
		this.xpass = xpass;
	}
	public String getQrpass() {
		return qrpass;
	}
	public void setQrpass(String qrpass) {
		this.qrpass = qrpass;
	}
	public String getUsers() {
		return users;
	}
	public void setUsers(String users) {
		this.users = users;
	}

}