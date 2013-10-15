package com.kyd.model.xsgl;

public class JybbdVO {
	
	private String ghdw;//购货单位
	private String ghdw_dm;
	
	private String NO;//NO
	private String pz;//品种
	private String pz_dm;
	
	private String dh;//代号
	private String djqd;//登记强度
	private String ccbh;//出厂编号
	private String slsc;//熟料生产
	private String xy;//旋窑
	private String ghrq;//购货日期
	private String ghsl;//购入数量
	private String cyr;//承运人
	
	
	private String bz_brw;//不溶物(标准)
	private String sj_brw;//不溶物(实际)
	private String bz_ssl;//烧失量
	private String sj_ssl;//
	private String bz_yhm;//氧化镁
	private String sj_yhm;
	private String bz_syhl;//三氧化硫
	private String sj_syhl;
	private String bz_llz;//氯离子
	private String sj_llz;
	private String bz_bbmj;//比表面积
	private String sj_bbmj;
	private String bz_ldlbsy;//0.08筛余
	private String sj_ldlbsy;
	private String bz_bzcdysl;//标准稠度用水量
	private String sj_bzcdysl;
	
	
	private String bz_ljsj_cl;
	private String sj_ljsj_cl;//凝结时间_初凝(实际)
	private String bz_ljsj_zl;
	private String sj_ljsj_zl;//凝结时间_终凝(实际)
	private String sj_aqx;//安全性
	private String bz_aqx;
	
	private String bz_3tqd_kz;
	private String sj_3tqd_kz_one;//3天强度抗折
	private String sj_3tqd_kz_two;
	private String sj_3tqd_kz_three;
	private String sj_3tqd_kz_pz; //平均值
	
	private String bz_3tqd_ky;
	private String sj_3tqd_ky_one;//3天强度抗压
	private String sj_3tqd_ky_two;
	private String sj_3tqd_ky_three;
	private String sj_3tqd_ky_four;
	private String sj_3tqd_ky_five;
	private String sj_3tqd_ky_six;
	private String sj_3tqd_ky_pz;
	
	//混合材信息
	private String cl_fmh;//参量粉煤灰
	private String cl_shs;//参量石灰石
	private String cl_kf;//矿粉
	private String cl_sg;//石膏
	private String cl_zmj;//助磨剂
	
	private String tbr;//填表人
	private String tbrq;//填表日期
	
	private String bz;//备注
	private String flag;//是否添加过28强度
	
	
	
	public String getFlag() {
		return flag;
	}
	public void setFlag(String flag) {
		this.flag = flag;
	}
	public String getBz() {
		return bz;
	}
	public void setBz(String bz) {
		this.bz = bz;
	}
	public String getGhdw() {
		return ghdw;
	}
	public void setGhdw(String ghdw) {
		this.ghdw = ghdw;
	}
	public String getNO() {
		return NO;
	}
	public void setNO(String no) {
		NO = no;
	}
	public String getPz() {
		return pz;
	}
	public void setPz(String pz) {
		this.pz = pz;
	}
	public String getDh() {
		return dh;
	}
	public void setDh(String dh) {
		this.dh = dh;
	}
	public String getDjqd() {
		return djqd;
	}
	public void setDjqd(String djqd) {
		this.djqd = djqd;
	}
	public String getCcbh() {
		return ccbh;
	}
	public void setCcbh(String ccbh) {
		this.ccbh = ccbh;
	}
	public String getSlsc() {
		return slsc;
	}
	public void setSlsc(String slsc) {
		this.slsc = slsc;
	}
	public String getXy() {
		return xy;
	}
	public void setXy(String xy) {
		this.xy = xy;
	}
	public String getGhrq() {
		return ghrq;
	}
	public void setGhrq(String ghrq) {
		this.ghrq = ghrq;
	}
	public String getGhsl() {
		return ghsl;
	}
	public void setGhsl(String ghsl) {
		this.ghsl = ghsl;
	}
	public String getCyr() {
		return cyr;
	}
	public void setCyr(String cyr) {
		this.cyr = cyr;
	}
	public String getSj_ljsj_cl() {
		return sj_ljsj_cl;
	}
	public void setSj_ljsj_cl(String sj_ljsj_cl) {
		this.sj_ljsj_cl = sj_ljsj_cl;
	}
	public String getSj_ljsj_zl() {
		return sj_ljsj_zl;
	}
	public void setSj_ljsj_zl(String sj_ljsj_zl) {
		this.sj_ljsj_zl = sj_ljsj_zl;
	}
	public String getSj_aqx() {
		return sj_aqx;
	}
	public void setSj_aqx(String sj_aqx) {
		this.sj_aqx = sj_aqx;
	}
	public String getBz_brw() {
		return bz_brw;
	}
	public void setBz_brw(String bz_brw) {
		this.bz_brw = bz_brw;
	}
	public String getSj_brw() {
		return sj_brw;
	}
	public void setSj_brw(String sj_brw) {
		this.sj_brw = sj_brw;
	}
	public String getBz_ssl() {
		return bz_ssl;
	}
	public void setBz_ssl(String bz_ssl) {
		this.bz_ssl = bz_ssl;
	}
	public String getSj_ssl() {
		return sj_ssl;
	}
	public void setSj_ssl(String sj_ssl) {
		this.sj_ssl = sj_ssl;
	}
	public String getBz_yhm() {
		return bz_yhm;
	}
	public void setBz_yhm(String bz_yhm) {
		this.bz_yhm = bz_yhm;
	}
	public String getSj_yhm() {
		return sj_yhm;
	}
	public void setSj_yhm(String sj_yhm) {
		this.sj_yhm = sj_yhm;
	}
	public String getBz_syhl() {
		return bz_syhl;
	}
	public void setBz_syhl(String bz_syhl) {
		this.bz_syhl = bz_syhl;
	}
	public String getSj_syhl() {
		return sj_syhl;
	}
	public void setSj_syhl(String sj_syhl) {
		this.sj_syhl = sj_syhl;
	}
	public String getBz_llz() {
		return bz_llz;
	}
	public void setBz_llz(String bz_llz) {
		this.bz_llz = bz_llz;
	}
	public String getSj_llz() {
		return sj_llz;
	}
	public void setSj_llz(String sj_llz) {
		this.sj_llz = sj_llz;
	}
	public String getBz_bbmj() {
		return bz_bbmj;
	}
	public void setBz_bbmj(String bz_bbmj) {
		this.bz_bbmj = bz_bbmj;
	}
	public String getSj_bbmj() {
		return sj_bbmj;
	}
	public void setSj_bbmj(String sj_bbmj) {
		this.sj_bbmj = sj_bbmj;
	}
	public String getBz_ldlbsy() {
		return bz_ldlbsy;
	}
	public void setBz_ldlbsy(String bz_ldlbsy) {
		this.bz_ldlbsy = bz_ldlbsy;
	}
	public String getSj_ldlbsy() {
		return sj_ldlbsy;
	}
	public void setSj_ldlbsy(String sj_ldlbsy) {
		this.sj_ldlbsy = sj_ldlbsy;
	}
	public String getBz_bzcdysl() {
		return bz_bzcdysl;
	}
	public void setBz_bzcdysl(String bz_bzcdysl) {
		this.bz_bzcdysl = bz_bzcdysl;
	}
	public String getSj_bzcdysl() {
		return sj_bzcdysl;
	}
	public void setSj_bzcdysl(String sj_bzcdysl) {
		this.sj_bzcdysl = sj_bzcdysl;
	}
	public String getSj_3tqd_kz_one() {
		return sj_3tqd_kz_one;
	}
	public void setSj_3tqd_kz_one(String sj_3tqd_kz_one) {
		this.sj_3tqd_kz_one = sj_3tqd_kz_one;
	}
	public String getSj_3tqd_kz_two() {
		return sj_3tqd_kz_two;
	}
	public void setSj_3tqd_kz_two(String sj_3tqd_kz_two) {
		this.sj_3tqd_kz_two = sj_3tqd_kz_two;
	}
	public String getSj_3tqd_kz_three() {
		return sj_3tqd_kz_three;
	}
	public void setSj_3tqd_kz_three(String sj_3tqd_kz_three) {
		this.sj_3tqd_kz_three = sj_3tqd_kz_three;
	}
	public String getSj_3tqd_ky_one() {
		return sj_3tqd_ky_one;
	}
	public void setSj_3tqd_ky_one(String sj_3tqd_ky_one) {
		this.sj_3tqd_ky_one = sj_3tqd_ky_one;
	}
	public String getSj_3tqd_ky_two() {
		return sj_3tqd_ky_two;
	}
	public void setSj_3tqd_ky_two(String sj_3tqd_ky_two) {
		this.sj_3tqd_ky_two = sj_3tqd_ky_two;
	}
	public String getSj_3tqd_ky_three() {
		return sj_3tqd_ky_three;
	}
	public void setSj_3tqd_ky_three(String sj_3tqd_ky_three) {
		this.sj_3tqd_ky_three = sj_3tqd_ky_three;
	}
	public String getSj_3tqd_ky_four() {
		return sj_3tqd_ky_four;
	}
	public void setSj_3tqd_ky_four(String sj_3tqd_ky_four) {
		this.sj_3tqd_ky_four = sj_3tqd_ky_four;
	}
	public String getSj_3tqd_ky_five() {
		return sj_3tqd_ky_five;
	}
	public void setSj_3tqd_ky_five(String sj_3tqd_ky_five) {
		this.sj_3tqd_ky_five = sj_3tqd_ky_five;
	}
	public String getSj_3tqd_ky_six() {
		return sj_3tqd_ky_six;
	}
	public void setSj_3tqd_ky_six(String sj_3tqd_ky_six) {
		this.sj_3tqd_ky_six = sj_3tqd_ky_six;
	}
	public String getCl_fmh() {
		return cl_fmh;
	}
	public void setCl_fmh(String cl_fmh) {
		this.cl_fmh = cl_fmh;
	}
	public String getCl_shs() {
		return cl_shs;
	}
	public void setCl_shs(String cl_shs) {
		this.cl_shs = cl_shs;
	}
	public String getCl_kf() {
		return cl_kf;
	}
	public void setCl_kf(String cl_kf) {
		this.cl_kf = cl_kf;
	}
	public String getCl_sg() {
		return cl_sg;
	}
	public void setCl_sg(String cl_sg) {
		this.cl_sg = cl_sg;
	}
	public String getCl_zmj() {
		return cl_zmj;
	}
	public void setCl_zmj(String cl_zmj) {
		this.cl_zmj = cl_zmj;
	}
	public String getTbr() {
		return tbr;
	}
	public void setTbr(String tbr) {
		this.tbr = tbr;
	}

	public String getTbrq() {
		return tbrq;
	}
	public void setTbrq(String tbrq) {
		this.tbrq = tbrq;
	}
	public String getSj_3tqd_kz_pz() {
		return sj_3tqd_kz_pz;
	}
	public void setSj_3tqd_kz_pz(String sj_3tqd_kz_pz) {
		this.sj_3tqd_kz_pz = sj_3tqd_kz_pz;
	}
	public String getSj_3tqd_ky_pz() {
		return sj_3tqd_ky_pz;
	}
	public void setSj_3tqd_ky_pz(String sj_3tqd_ky_pz) {
		this.sj_3tqd_ky_pz = sj_3tqd_ky_pz;
	}
	public String getBz_ljsj_cl() {
		return bz_ljsj_cl;
	}
	public void setBz_ljsj_cl(String bz_ljsj_cl) {
		this.bz_ljsj_cl = bz_ljsj_cl;
	}
	public String getBz_ljsj_zl() {
		return bz_ljsj_zl;
	}
	public void setBz_ljsj_zl(String bz_ljsj_zl) {
		this.bz_ljsj_zl = bz_ljsj_zl;
	}
	public String getBz_aqx() {
		return bz_aqx;
	}
	public void setBz_aqx(String bz_aqx) {
		this.bz_aqx = bz_aqx;
	}
	public String getBz_3tqd_kz() {
		return bz_3tqd_kz;
	}
	public void setBz_3tqd_kz(String bz_3tqd_kz) {
		this.bz_3tqd_kz = bz_3tqd_kz;
	}
	public String getBz_3tqd_ky() {
		return bz_3tqd_ky;
	}
	public void setBz_3tqd_ky(String bz_3tqd_ky) {
		this.bz_3tqd_ky = bz_3tqd_ky;
	}
	public String getGhdw_dm() {
		return ghdw_dm;
	}
	public void setGhdw_dm(String ghdw_dm) {
		this.ghdw_dm = ghdw_dm;
	}
	public String getPz_dm() {
		return pz_dm;
	}
	public void setPz_dm(String pz_dm) {
		this.pz_dm = pz_dm;
	}
	
}
