package com.kyd.dao.xtgl;

import java.util.List;

import com.kyd.model.User;

/**
 * @author  yeeku.H.lee kongyeeku@163.com
 * @version  1.0
 * <br>Copyright (C), 2005-2008, yeeku.H.Lee
 * <br>This program is protected by copyright laws.
 * <br>Program Name:
 * <br>Date: 
 */
public interface IUserDao  
{
    /**
     * 根据id查找用户
     * @param id 需要查找的种类id
     */  
    User get(String id);
    /**
     * 增加种类
     * @param user 需要增加的种类
     */       
    void save(User user);

    /**
     * 修改用户
     * @param user 需要修改的用户
     */  
    void update(User user);

    /**
     * 删除用户
     * @param id 需要删除的用户id
     */  
    void delete(int id);

    /**
     * 删除用户
     * @param user 需要删除的用户
     */  
    void delete(User user);
    
    /**
     * 查询用户总数
     * @param user 需要删除的用户
     */
    int findUserTotal();

    /**
     * 查询全部用户
     * @return 获得全部用户
     */ 
    List<User> findAll();
    
    List<User> findAll(int start,int limit,String uid);

    /**
     * 根据用户名，密码查找用户
     * @param user 查询所需的用户名
     * @param pass 查询所需的密码
     * @return 对应的用户
     */ 
    User findUserByNameAndPass(String user , String pass);
    
    /**
     * 根据用户ID，密码查找用户
     * @param user_id 查询所需的用户ID
     * @param pass 查询所需的密码
     * @return 对应的用户
     */ 
    User findUserIdAndPass(final String user_id, final String pass);

    /**
     * 根据用户名ID
     * @param user 查询所需的用户ID
     * @return 对应的用户
     */ 
    User findUserByName(String user_id);
    /**
     * 修改密码
     * @param user 查询所需的用户名
     * @return 对应的用户
     */ 
    void updatePass(User user);

}