package com.kyd.dao.xtgl;

import java.util.List;

import com.kyd.model.Tree;
public interface ITreeDao {
	/*
	 * 获得菜单树list
	 */
	public List<Tree> getTree(String id,String user_pid);
	
}
