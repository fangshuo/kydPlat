package com.kyd.dao.xtgl;

import java.util.List;
import java.util.Map;

public interface IJiaoSePzDao {
	/**
	 * 获取角色菜单树
	 * @param id
	 * @return
	 */
	public List getJiaoSeTree(String id);
	/**
	 * 获取功能树菜单
	 * @param map
	 * 
	 * @return
	 */
	public List getMenuTree(Map map);
	/**
	 * 获取初始化菜单树
	 * @param pid 父节点id
	 * @return
	 */
	public List getInitMenuTree(String pid);
	
	/**
	 * 取之前选择过的角色菜单树
	 * 
	 * @param id
	 * @return
	 */
	public List getCheckedMenuTree(String pid,String jsdm);
	/**
	 * 提交数据
	 * @param list
	 * @return
	 */
	public int submitData(List list,String jsdm);
	/**
	 * 插入数据
	 * @param sql
	 * @param datalist
	 * @return
	 */
	public int insertData(String sql,final List datalist);
	/**
	 *  新增数据 单条数据的插入，没用到事务
	 * @param list
	 * @param jsdm
	 * @return
	 */
	public int saveData(List list,String jsdm);
	/**
	 * 删除数据
	 * @param id
	 * @param leaf
	 * 
	 *  
	 */
	public int delData(String id,String leaf,int i);
	/**
	 * 修改数据
	 * @param id
	 * @param mc
	 * @param leaf
	 * @return
	 */
	public int changeData(String id,String mc,String leaf);
}
