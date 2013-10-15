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
import com.kyd.dao.xtgl.IJiaoSePzDao;
import com.kyd.model.JiaoSePz;
import com.kyd.model.TreeCheckBox;
import com.kyd.model.TreeExpanded;
import com.kyd.model.TreeGNS;

public class JiaoSePzDaoImpl extends BaseDao implements IJiaoSePzDao {

	private static Logger logger = Logger.getLogger(JiaoSePzDaoImpl.class);

	/**
	 * 获取角色菜单树
	 * 
	 * @param id
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List getJiaoSeTree(String id) {
		List<JiaoSePz> rows = this.getSqlMapClientTemplate().queryForList(
				"getJiaoSeTree", id);
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
					vo.setChildren(this.getJiaoSeTree(js.getJs_dm()));
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
	 * 获取功能树菜单
	 * 
	 * @param map
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List getMenuTree(Map map) {
		String gnsid = (String) map.get("gnsid");
		if (null != map.get("jsdm") && !"".equals(map.get("jsdm"))) {
			String jsdm = (String) map.get("jsdm");
			return getCheckedMenuTree(gnsid, jsdm);
		} else {
			return getInitMenuTree(gnsid);
		}
	}

	/**
	 * 获取初始化菜单树
	 * 
	 * @param pid
	 *            父节点id
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List getInitMenuTree(String pid) {
		List<TreeGNS> rows = this.getSqlMapClientTemplate().queryForList(
				"getGNS", pid);
		if (null != rows && rows.size() > 0) {
			List list = new ArrayList();
			for (TreeGNS gns : rows) {
				if ("0".equals(String.valueOf(gns.getIsleaf()))) {
					TreeExpanded vo = new TreeExpanded();
					// vo.setCls("folder");
					vo.setLeaf(false);
					// vo.setSingleClickExpand(false);
					vo.setId(String.valueOf(gns.getId()));
					vo.setText(gns.getSqzl_mc());
					vo.setExpanded(true);
					vo.setChildren(this.getInitMenuTree(String.valueOf(gns
							.getId())));
					list.add(vo);
				} else {
					TreeCheckBox ckbvo = new TreeCheckBox();
					ckbvo.setLeaf(true);
					ckbvo.setChecked(false);
					ckbvo.setId(String.valueOf(gns.getId()));
					ckbvo.setText(gns.getSqzl_mc());
					list.add(ckbvo);
				}
			}
			return list;
		}

		return null;
	}

	/**
	 * 取之前选择过的角色菜单树
	 * 
	 * @param id
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List getCheckedMenuTree(String pid, String jsdm) {
		Map map = new HashMap();
		map.put("pid", pid);
		map.put("jsdm", jsdm);
		List<TreeGNS> rows = this.getSqlMapClientTemplate().queryForList(
				"getCheckedMenuTree", pid);
		if (null != rows && rows.size() > 0) {
			List list = new ArrayList();
			for (TreeGNS gns : rows) {
				if ("0".equals(String.valueOf((gns.getIsleaf())))) {
					TreeExpanded vo = new TreeExpanded();
					vo.setLeaf(false);
					// vo.setSingleClickExpand(false);
					vo.setId(String.valueOf(gns.getId()));
					vo.setText(gns.getSqzl_mc());
					vo.setExpanded(true);
					vo.setChildren(this.getCheckedMenuTree(String.valueOf(gns
							.getId()), jsdm));
					list.add(vo);
				} else {
					TreeCheckBox ckbvo = new TreeCheckBox();
					ckbvo.setLeaf(true);

					if (null != gns.getJs_dm()) {
						ckbvo.setChecked(true);
						ckbvo.setCls("big");

					} else {
						ckbvo.setChecked(false);
					}
					ckbvo.setId(String.valueOf(gns.getId()));
					ckbvo.setText(gns.getSqzl_mc());
					list.add(ckbvo);
				}
			}
			return list;
		}
		return null;
	}

	/**
	 * 提交数据
	 * 
	 * @param list
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public int submitData(List list, String jsdm) {

		int xzcount = 0;// 新增的记录数
		int yscount = (Integer) this.getSqlMapClientTemplate().queryForObject(
				"queryJsGNSCount", jsdm);
		if (yscount > 0) {
			// 删除的记录数 先根据用户id该id对应的角色全部删除，然后再插入
			int delcount = this.getSqlMapClientTemplate().delete(
					"deleteJsGNSByJsdm", jsdm);
			if (delcount == yscount) {
				xzcount = insertData("insertJsGNS", list);
			} else {
				return -1;
			}
		} else {
			xzcount = insertData("insertJsGNS", list);
		}
		return xzcount;
	}

	/**
	 * 插入数据
	 * 
	 * @param sql
	 * @param datalist
	 * @return
	 */
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

	/**
	 * 新增数据 单条数据的插入，没用到事务
	 * 
	 * @param list
	 * @param jsdm
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public int saveData(List list, String jsdm) {
		final List datalist = list;
		try {
			if (list != null) {
				this.getSqlMapClientTemplate().execute(
						new SqlMapClientCallback() {
							public Object doInSqlMapClient(
									SqlMapExecutor executor)
									throws SQLException {
								executor.startBatch();
								for (int i = 0, n = datalist.size(); i < n; i++) {
									executor.insert("insertXTJS", datalist.get(i));
								}
								executor.executeBatch();
								return null;
							}
						});
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("saveData batchInsert 失败: id [insertXTJS], parameterObject [" + list + "].  原因: "
					+ e.getMessage());
		}
		return list.size();
	}

	/**
	 * 删除数据
	 * 
	 * @param id
	 * @param leaf
	 * 
	 * 
	 */
	@SuppressWarnings("unchecked")
	public int delData(String id, String leaf, int i) {
		int count = i;
			// 如果是非叶子节点，取出该节点下的叶子节点，删除数据
		if ("0".equals(leaf)) {
			List<JiaoSePz> rows = this.getSqlMapClientTemplate().queryForList("queryTCXTJS", id);
			// 删除tb_js表中的数据
			int row = (Integer)this.getSqlMapClientTemplate().delete("deleteTCXTJS", id);
			count += row;
			if (null != rows && rows.size() > 0) {
				for(JiaoSePz js :rows){
					this.delData(js.getJs_dm(), js.getJs_lx(), count);
				}
			}
		} else {
			// 删除tb_js 以及 角色菜单关联表
			int delmenurow = this.getSqlMapClientTemplate().delete("deleteTCXTJSGNS", id);
			count += delmenurow;
			// 删除tb_js表中的数据
			int row = (Integer)this.getSqlMapClientTemplate().delete("deleteTCXTJS", id);
			count += row;

		}
		return count;

	}

	/**
	 * 修改数据
	 * 
	 * @param id
	 * @param mc
	 * @param leaf
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public int changeData(String id, String mc, String leaf) {
		Map map = new HashMap();
		map.put("id", id);
		map.put("mc", mc);
		map.put("leaf", leaf);
		return (Integer)this.getSqlMapClientTemplate().update("updateXTJS", map);
	}

}
