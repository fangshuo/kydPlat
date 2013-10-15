package com.kyd.dao.xtgl.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.kyd.dao.base.BaseDao;
import com.kyd.dao.xtgl.IUserDao;
import com.kyd.model.User;

public class UserDaoImpl extends BaseDao implements IUserDao {
	
	public int findUserTotal(){
		return (Integer)this.getSqlMapClientTemplate().queryForObject("getAllUser");
	}

	public void delete(int id) {
	}
	/**
	 * 删除
	 */
	public void delete(User user) {
		this.getSqlMapClientTemplate().delete("deleteUser",user);
	}
	/**
	 * 查询
	 */
	@SuppressWarnings("unchecked")
	public List<User> findAll(int start,int limit,String uid) {
		User user = new User();
		user.setUser_id(uid);
		user.setStart(start);
		user.setLimit(limit);
		return this.getSqlMapClientTemplate().queryForList("findAllUser",user);
	}
	/**
	 * 根据用户名查询用户信息
	 */
	@SuppressWarnings("unchecked")
	public User findUserByName(String user_id) {
		
		List<User> userList = this.getSqlMapClientTemplate().queryForList("getUserByID", user_id);
		User user = null;
		if(userList.size() > 0 && userList !=null){
			User p = (User)userList.get(0); 
			user = new User();
			user.setUser_id(p.getUser_id());
			user.setUser(p.getUsers());
			user.setSex(p.getSex());
			user.setEmail(p.getEmail());
			user.setPid(p.getPid());
		}
		return user;
	}
	/**
	 *根据用户名和密码查询
	 */
	@SuppressWarnings("unchecked")
	public User findUserByNameAndPass(final String user, final String pass) {
		User u = null;
		Map map = new HashMap();
		map.put("user", user);
		map.put("pass", pass);
		List<User> userList = this.getSqlMapClientTemplate().queryForList("findUserByNameAndPass", map);
		if(userList.size() > 0 && userList !=null){
			u = new User();
			u.setUser_id(userList.get(0).getUser_id());
			u.setUser(user);
		}
		return u;
	}
	
	/**
	 *根据用户ID和密码查询查询
	 */
	@SuppressWarnings("unchecked")
	public User findUserIdAndPass(final String user_id, final String pass) {
		Map map = new HashMap();
		map.put("user_id", user_id);
		map.put("pass", pass);
	    User user = null;
	    List<User> userList = this.getSqlMapClientTemplate().queryForList("findUserIdAndPass", map);
		if(userList.size() > 0 && userList !=null){
			user = new User();
			user.setUser_id(userList.get(0).getUser_id());
		}
		return user;
	}

	public User get(String id) {
		return null;
	}
	/**
	 * 保存
	 */
	public void save(User user) {
		this.getSqlMapClientTemplate().insert("saveUser",user);
		
	}
	/**
	 * 修改用户信息
	 */
	public void update(User user) {
		this.getSqlMapClientTemplate().update("updateUser", user);
	}
	
	
	/**
	 * 修改密码
	 */
	public void updatePass(User user) {
		this.getSqlMapClientTemplate().update("updatePass", user);
	}
	
	
	public List<User> findAll() {
		return null;
	}

}
