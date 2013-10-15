package com.kyd.service.xtgl.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.kyd.dao.xtgl.IUserJsGlDao;
import com.kyd.service.xtgl.IUserJsGlService;

public class UserJsGlServiceImpl implements IUserJsGlService {

	protected IUserJsGlDao userJsGlDao;

	public void setUserJsGlDao(IUserJsGlDao userJsGlDao) {
		this.userJsGlDao = userJsGlDao;
	}

	public List getTree(Map map, String lx) {
		try {
			List list = null;
			if ("0".equals(lx)) {
				String id = (String) map.get("id");
				list = userJsGlDao.getUserTree(id);
			} else if ("1".equals(lx)) {
				list = userJsGlDao.getJiaoSeTree(map);
			}
			return list;

		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("加载菜单出现异常");
		}
	}

	public HashMap submitData(List list, String userid) {
		HashMap map = new HashMap();

		try {
			int i = userJsGlDao.submitData(list, userid);
			if (i == list.size()) {
				map.put("success", "true");
				map.put("msg", "关联角色成功!!!");
			} else if (i == -1) {
				map.put("success", "true");
				map.put("msg", "修改数据出错！！");
			}

			return map;
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("保存数据出错!");
		}
	}

}
