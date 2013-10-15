package com.kyd.service.xtgl;

import java.util.List;

import com.kyd.model.User;

/**
 * @author yeeku.H.lee kongyeeku@163.com
 * @version 1.0 <br>
 *          Copyright (C), 2005-2008, yeeku.H.Lee <br>
 *          This program is protected by copyright laws. <br>
 *          Program Name: <br>
 *          Date:
 */
public interface IUserManagerService {

    /**
     * 新增用户
     * @param user 新增用户的用户名
     * @param pass 新增用户的密码
     * @param email 新增用户的电子邮件
	 * @return 新增用户的主键
     */
    public int addUser(String user , String pass , String email);
    /**
     * 查询用户总数
     */
    public int findUserTotal();
    
    /**
     * 查询所有用户
     */
    public List<User> findAllUser(int start,int limit,String uid);

    /**
     * 验证用户登陆
     * @param user 需要登陆的用户名
     * @param pass 需要登陆的密码
	 * @return 是否登陆成功
     */
    public int loginValid(String user , String pass);
    
    /**
     * 验证用户登陆
     * @param user_id 需要登陆的用户Id
     * @param pass 需要登陆的密码
	 * @return 是否登陆成功
     */
    public int findUserIdAndPass(String user_id , String pass);

    /**
     * 验证用户名是否可用，如果系统中已有该用户名，则不可用。
     * @param user 需要验证的用户名
	 * @return 用户名是否可用
     */
	public boolean validateName(String user);
	
	 /**
     * 验证是否有该用户。
     * @param user 需要验证的用户名
	 * @return 用户名是否可用
     */
	public boolean getvalidateName(String user_id);
	
	/**
     * 查询用户信息
     * @param user 需要验证的用户名
	 * @return 用户名是否可用
     */
	public User getUser(String user_id);
	/**
	 * 修改用户信息
	 */
	public void updateUser(User u);
	
	/**
	 * 修改密码
	 */
	public void updatePass(User u);
	
	public void addUser(User u);
	
	public void deleteUser(User u);

	public List findAllUser();

}
