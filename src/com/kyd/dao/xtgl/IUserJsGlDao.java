package com.kyd.dao.xtgl;
import java.util.List;
import java.util.Map;

public interface IUserJsGlDao {

	
	/**
	 *  获取用户树
	 * @param id
	 * @return
	 */
	public List getUserTree(String id);
	
	
	/**
	 * 获取角色菜单树
	 * @param id
	 * @return
	 */
	public List getJiaoSeTree(Map map);
	
	/**
	 * 取之前选择过的角色菜单树
	 * 
	 * @param id
	 * @return
	 */
	public List getCheckedJiaoSeTree(String id,String userid);
	
	
	
	/**
	 * 获取初始化的角色菜单树
	 * @param id
	 * @return
	 */
	public List getInitJiaoSeTree(String id);
	
	
	
	/**
	 * 保存角色与用户关系
	 * @param list
	 * @return
	 */
	public int submitData(List list,String userid);
	
	public int insertData(String sql,final List datalist);
}
