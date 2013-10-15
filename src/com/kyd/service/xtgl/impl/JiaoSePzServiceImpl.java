package com.kyd.service.xtgl.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.kyd.dao.xtgl.IJiaoSePzDao;
import com.kyd.service.xtgl.IJiaoSePzService;

public class JiaoSePzServiceImpl implements IJiaoSePzService {

	private IJiaoSePzDao jiaoSePzdao;

	public void setJiaoSePzdao(IJiaoSePzDao jiaoSePzdao) {
		this.jiaoSePzdao = jiaoSePzdao;
	}

	public List getTree(Map map, String bj) {
		try {
			List list = null;
			if ("0".equals(bj)) {
				String gnsid = (String) map.get("gnsid");
				list = jiaoSePzdao.getJiaoSeTree(gnsid);
			} else if ("1".equals(bj)) {
				list = jiaoSePzdao.getMenuTree(map);
			}
			return list;

		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("加载菜单出现异常");
		}
	}

	public HashMap submitData(List list, String jsdm) {
		HashMap map = new HashMap();

		try {
			int i = jiaoSePzdao.submitData(list, jsdm);
			if (i == list.size()) {
				map.put("success", "true");
				map.put("msg", "关联菜单成功!!!");
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

	public HashMap saveData(List list, String jsdm) {
		HashMap map = new HashMap();
		try {
			int i = jiaoSePzdao.saveData(list, jsdm);
			if (i == list.size()) {
				map.put("success", "true");
				map.put("msg", "保存成功");
			}
			return map;
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("保存数据出错!");
		}
	}

	public HashMap changeData(String id, String mc, String leaf) {
		HashMap map = new HashMap();
		try {
			int i = jiaoSePzdao.changeData(id, mc, leaf);
			if (i == 1) {
				map.put("success", "true");
				map.put("msg", "修改数据成功！！！");
			}

			return map;
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("修改数据出错!");
		}
	}

	public HashMap delData(String id, String leaf) {
		HashMap map = new HashMap();
		try {
			int i = jiaoSePzdao.delData(id, leaf, 0);
			if (i > 0) {
				map.put("success", "true");
				map.put("msg", "删除数据成功！！！");
			}

			return map;
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("删除数据出错!");
		}

	}

}
