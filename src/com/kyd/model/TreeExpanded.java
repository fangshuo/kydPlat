package com.kyd.model;

import java.util.ArrayList;
import java.util.List;

/**
 * 带expanded属性，会将节点全部展开
 * @author zhoufeng
 *
 */
public class TreeExpanded {
	
	private String text;
	private String id;
	private boolean leaf;
	private String cls;
	//private boolean singleClickExpand;
	private String href;
	private String isClose;
	private String openFlag;
	private String xy_bj;
	private String bz;
	
	private List children = new ArrayList();
	private boolean expanded;
	
	
	/**
	 * public boolean isSingleClickExpand() {
		return singleClickExpand;
	}
	public void setSingleClickExpand(boolean singleClickExpand) {
		this.singleClickExpand = singleClickExpand;
	}
	 */

	
	public List getChildren() {
		return children;
	}
	public void setChildren(List children) {
		this.children = children;
	}
	public boolean isExpanded() {
		return expanded;
	}
	public void setExpanded(boolean expanded) {
		this.expanded = expanded;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public boolean isLeaf() {
		return leaf;
	}
	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}
	public String getCls() {
		return cls;
	}
	public void setCls(String cls) {
		this.cls = cls;
	}
	
	public String getHref() {
		return href;
	}
	public void setHref(String href) {
		this.href = href;
	}
	public String getIsClose() {
		return isClose;
	}
	public void setIsClose(String isClose) {
		this.isClose = isClose;
	}
	public String getOpenFlag() {
		return openFlag;
	}
	public void setOpenFlag(String openFlag) {
		this.openFlag = openFlag;
	}
	public String getXy_bj() {
		return xy_bj;
	}
	public void setXy_bj(String xy_bj) {
		this.xy_bj = xy_bj;
	}
	public String getBz() {
		return bz;
	}
	public void setBz(String bz) {
		this.bz = bz;
	}
}
