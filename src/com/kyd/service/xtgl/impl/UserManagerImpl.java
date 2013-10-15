package com.kyd.service.xtgl.impl;

import java.util.List;

import com.kyd.dao.xtgl.IUserDao;
import com.kyd.model.User;
import com.kyd.service.xtgl.IUserManagerService;
import com.kyd.util.SecurityUtils;


/**
 * @author  yeeku.H.lee kongyeeku@163.com
 * @version  1.0
 * <br>Copyright (C), 2005-2008, yeeku.H.Lee
 * <br>This program is protected by copyright laws.
 * <br>Program Name:
 * <br>Date: 
 */
public class UserManagerImpl implements IUserManagerService
{
	private IUserDao userDao;


    public IUserDao getUserDao() {
		return userDao;
	}

	public void setUserDao(IUserDao userDao) {
		this.userDao = userDao;
	}

	/**
     * 新增用户
     * @param user 新增用户的用户名
     * @param pass 新增用户的密码
     * @param email 新增用户的电子邮件
	 * @return 新增用户的主键
     */
    public int addUser(String user , String pass , String email) 
	{
		try
		{
			User u = new User();
			u.setUser(user);
			u.setPass(pass);
			u.setEmail(email);
			userDao.save(u);
			return 1;
		}
		catch (Exception e)
		{
			e.printStackTrace();
			throw new RuntimeException("新增用户时出现异常");
		}
	}
    
    /**
     * 查询用户总数
     */
    public int findUserTotal() 
		
	{
		try
		{
			return userDao.findUserTotal();
		}
		catch (Exception e)
		{
			e.printStackTrace();
			throw new RuntimeException("查询用户总数出现异常");
		}
	}
    
    /**
     * 查询所有用户
     */
    public List<User> findAllUser(int start,int limit,String uid) 
		
	{
		try
		{
			return userDao.findAll(start,limit,uid);
		}
		catch (Exception e)
		{
			e.printStackTrace();
			throw new RuntimeException("查询所有用户出现异常");
		}
	}

    /**
     * 验证用户登陆
     * @param user 需要登陆的用户名
     * @param pass 需要登陆的密码
	 * @return 是否登陆成功
     */
    public int loginValid(String user , String pass) {
		try
		{
			User u = userDao.findUserByNameAndPass(user , pass);
			if (u != null)
			{
				return 1;
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
			throw new RuntimeException("验证用户登陆时出现异常");
		}
		return -1;
	}
    
    /**
     * 验证用户登陆
     * @param user_id 需要登陆的用户Id
     * @param pass 需要登陆的密码
	 * @return 是否登陆成功
     */
    public int findUserIdAndPass(String user_id , String pass) 
		
	{
		try
		{
			User u = userDao.findUserIdAndPass(user_id , pass);
			if (u != null)
			{
				return 1;
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
			throw new RuntimeException("验证用户登陆时出现异常");
		}
		return -1;
	}

    /**
     * 验证用户名是否可用，如果系统中已有该用户名，则不可用。
     * @param user 需要验证的用户名
	 * @return 用户名是否可用
     */
	public boolean validateName(String user)
		
	{
		try
		{
			if (userDao.findUserByName(user) == null)
			{
				return true;
			}
			return false;
		}
		catch (Exception e)
		{
			throw new RuntimeException("验证用户名是否有效出错！");
		}
	}
	
	 /**
     * 验证是否有该用户。
     * @param user 需要验证的用户名
	 * @return 用户名是否可用
     */
	public boolean getvalidateName(String user_id)
		
	{
		try
		{
			User u =(User)userDao.findUserByName(user_id);
			if (null!=u)
			{
				return true;
			}
			return false;
		}
		catch (Exception e)
		{
			throw new RuntimeException("没有该用户！");
		}
	}
	
	/**
     * 查询用户信息
     * @param user 需要验证的用户名
	 * @return 用户名是否可用
     */
	public User getUser(String user_id)
		
	{
		User u;
		try
		{
			 u =(User)userDao.findUserByName(user_id);
		}
		catch (Exception e)
		{
			throw new RuntimeException("没有该用户！");
		}
		return u;
	}
	/**
	 * 修改用户信息
	 */
	public void updateUser(User u)  {
		userDao.update(u);		
	}
	
	/**
	 * 修改密码
	 */
	public void updatePass(User u)  {
		userDao.updatePass(u);
	}
	
	public void addUser(User u)  {
		userDao.save(u);		
	}
	
	public void deleteUser(User u)  {
		userDao.delete(u);		
	}

	public List findAllUser()  {
		// TODO Auto-generated method stub
		return null;
	}

}