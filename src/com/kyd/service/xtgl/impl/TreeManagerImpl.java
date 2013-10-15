package com.kyd.service.xtgl.impl;

import java.util.List;

import com.kyd.dao.xtgl.ITreeDao;
import com.kyd.model.Tree;
import com.kyd.service.xtgl.ITreeManagerService;

public class TreeManagerImpl implements ITreeManagerService {

	private ITreeDao treeDao;

	public void setTreeDao(ITreeDao treeDao) {
		this.treeDao = treeDao;
	}

	public List<Tree> getTree(String id, String pid) {
		try {
			List<Tree> list = treeDao.getTree(id, pid);
			if (list != null && list.size() > 0) {
				return list;
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("加载菜单出现异常");
		}
		return null;
	}

}
