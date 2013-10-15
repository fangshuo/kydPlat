package com.kyd.model.jbxx;

public class ShangPinVO {
	
	private String text;
	private String id;
	private String bz;
	private boolean leaf;
	private String xybj;

	
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
	
	public String getXybj() {
		return xybj;
	}
	public void setXybj(String xybj) {
		this.xybj = xybj;
	}
	public String getBz() {
		return bz;
	}
	public void setBz(String bz) {
		this.bz = bz;
	}

}
