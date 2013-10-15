package com.kyd.dao.xtgl.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.kyd.dao.base.BaseDao;
import com.kyd.dao.xtgl.ITreeDao;
import com.kyd.model.Tree;
import com.kyd.model.TreeGNS;

public class TreeDaoImpl extends BaseDao implements ITreeDao {

	/**
	 * 获得菜单树list
	 */
	@SuppressWarnings("unchecked")
	public List<Tree> getTree(String id, String user_pid){
		Map map = new HashMap();
		map.put("id", id);
		map.put("user_pid", user_pid);
		List<Tree> listTrees = null;
		int count = (Integer)this.getSqlMapClientTemplate().queryForObject("getGNSCount",id);
		if (count > 0) {
			List<TreeGNS> rows = this.getSqlMapClientTemplate().queryForList("getAllTrees",map);
			if (null != rows && rows.size() > 0) {
				listTrees = new ArrayList<Tree>();
				Tree vo = null;
				for(TreeGNS gns : rows){
					vo = new Tree();
					if("0".equals(String.valueOf(gns.getIsleaf()))){
						vo.setCls("folder");
						vo.setLeaf(false);
					}else{
						vo.setLeaf(true);
						if(!"".equals(gns.getUrl())){
							vo.setHref(gns.getUrl());
						}
						vo.setIsClose(gns.getIsclose());
						vo.setOpenFlag(String.valueOf(gns.getOpenflag()));
					}
					vo.setId(String.valueOf(gns.getId()));
					vo.setText(gns.getSqzl_mc());
					listTrees.add(vo);
				}
				return listTrees;
			}
		}
		return null;
	}

	protected String nullTOEmpty(String str) {
		if (null == str) {
			return "";
		} else {
			return str;
		}
	}

}
