package com.kyd.dao.xtgl.impl;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.orm.ibatis.SqlMapClientCallback;

import com.ibatis.sqlmap.client.SqlMapExecutor;
import com.kyd.dao.base.BaseDao;
import com.kyd.dao.xtgl.IUserJsGlDao;
import com.kyd.model.JiaoSePz;
import com.kyd.model.TreeCheckBox;
import com.kyd.model.TreeExpanded;
import com.kyd.model.XtUser;

public class UserJsGlDaoImpl extends BaseDao implements IUserJsGlDao {
	private static Logger logger = Logger.getLogger(UserJsGlDaoImpl.class);

	/**
	 * 获取用户树
	 * 
	 * @param id
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List getUserTree(String id) {
		List<XtUser> rows = this.getSqlMapClientTemplate().queryForList(
				"queryTCXTUSER");
		if (null != rows && rows.size() > 0) {
			List list = new ArrayList();
			for (XtUser xtUser : rows) {
				TreeCheckBox ckbvo = new TreeCheckBox();
				ckbvo.setLeaf(true);
				ckbvo.setChecked(false);
				ckbvo.setId(xtUser.getPid());
				ckbvo.setText(xtUser.getUsername());
				list.add(ckbvo);
			}
			return list;
		}
		return null;
	}

	/**
	 * 获取角色菜单树
	 * 
	 * @param id
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List getJiaoSeTree(Map map) {
		String id = (String) map.get("id");

		if (null != map.get("userid")) {
			String userid = (String) map.get("userid");
			return getCheckedJiaoSeTree(id, userid);
		} else {
			return getInitJiaoSeTree(id);
		}

	}

	/**
	 * 取之前选择过的角色菜单树
	 * 
	 * @param id
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List getCheckedJiaoSeTree(String id, String userid) {
		Map map = new HashMap();
		map.put("id", id);
		map.put("userid", userid);
		List<JiaoSePz> rows = this.getSqlMapClientTemplate().queryForList(
				"queryJiaoSePz", map);
		if (null != rows) {
			List list = new ArrayList();
			for (JiaoSePz pz : rows) {
				if ("0".equals(pz.getJs_lx())) {
					TreeExpanded vo = new TreeExpanded();
					vo.setLeaf(false);
					// vo.setSingleClickExpand(false);
					vo.setId(pz.getJs_dm());
					vo.setText(pz.getJs_mc());
					vo.setExpanded(true);
					vo.setChildren(this.getCheckedJiaoSeTree(pz.getJs_dm(),
							userid));
					list.add(vo);
				} else {
					TreeCheckBox ckbvo = new TreeCheckBox();
					ckbvo.setLeaf(true);

					if (null != pz.getXy_bj()) {
						ckbvo.setChecked(true);
						ckbvo.setCls("big");

					} else {
						ckbvo.setChecked(false);
					}
					ckbvo.setId(pz.getJs_dm());
					ckbvo.setText(pz.getJs_mc());
					list.add(ckbvo);
				}
			}
			return list;
		}
		return null;
	}

	/**
	 * 获取初始化的角色菜单树
	 * 
	 * @param id
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List getInitJiaoSeTree(String id) {
		List<JiaoSePz> rows = this.getSqlMapClientTemplate().queryForList(
				"queryJiaoSeTree", id);
		if (null != rows && rows.size() > 0) {
			List list = new ArrayList();
			for (JiaoSePz js : rows) {
				if ("0".equals(js.getJs_lx())) {
					TreeExpanded vo = new TreeExpanded();
					// vo.setCls("folder");
					vo.setLeaf(false);
					// vo.setSingleClickExpand(false);
					vo.setExpanded(true);
					vo.setId(js.getJs_dm());
					vo.setText(js.getJs_mc());
					vo.setChildren(this.getInitJiaoSeTree(js.getJs_dm()));
					list.add(vo);
				} else {
					TreeCheckBox ckbvo = new TreeCheckBox();
					ckbvo.setLeaf(true);
					ckbvo.setChecked(false);
					ckbvo.setId(js.getJs_dm());
					ckbvo.setText(js.getJs_mc());
					list.add(ckbvo);
				}
			}
			return list;
		}
		return null;
	}

	/**
	 * 保存角色与用户关系
	 * 
	 * @param list
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public int submitData(List list, String userid) {

		int xzcount = 0;// 新增的记录数
		// 取原始的记录数
		int yscount = (Integer) this.getSqlMapClientTemplate().queryForObject(
				"queryXTJSUSERCount", userid);
		if (yscount > 0) {
			// 删除的记录数 先根据用户id该id对应的角色全部删除，然后再插入
			int delcount = this.getSqlMapClientTemplate().delete(
					"deleteXTJSUSERById", userid);

			if (delcount == yscount) {
				xzcount = insertData("insertXTJSUSER", list);
			} else {
				return -1;
			}
		} else {
			xzcount = insertData("insertXTJSUSER", list);
		}

		return xzcount;
	}

	@SuppressWarnings("unchecked")
	public int insertData(final String statementName, final List list) {
		try {
			if (list != null) {
				this.getSqlMapClientTemplate().execute(
						new SqlMapClientCallback() {
							public Object doInSqlMapClient(
									SqlMapExecutor executor)
									throws SQLException {
								executor.startBatch();
								for (int i = 0, n = list.size(); i < n; i++) {
									executor.insert(statementName, list.get(i));
								}
								executor.executeBatch();
								return null;
							}
						});
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("insertData batchInsert 失败: id [" + statementName
					+ "], parameterObject [" + list + "].  原因: "
					+ e.getMessage());
		}
		return list.size();
	}

}
