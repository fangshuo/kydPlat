<%@ page contentType="text/html; charset=UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<html>
	<head>
	 <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	
	<link rel="stylesheet" type="text/css" href="extjs/resources/css/ext-all.css" />	
	<link rel="stylesheet" type="text/css" href="css/common.css" />
	
	<script type="text/javascript"	src="extjs/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="extjs/ext-all-debug.js"></script>			
 	<script type="text/javascript" src="extjs/ext-lang-zh_CN.js"></script>	

	<script type="text/javascript" src="javascript/common.js"></script>
	<script type="text/javascript" src="jsp/jxc/xsgl/AddJianYanbbd.js"></script>
	
	<style type="text/css">

.inputA
{ 
	border-left:none; 
    border-right:none;
    border-top:none;  
    border-bottom:none; 
    width: 100%;
    height:30px;
    font-size: 15px;
    text-align: center;
} 
       

.table2{
border-top-style: none;
}

.bq
{
	font-size: 15.0pt;
}

.gjz {
	color: #FF0000;
	font-size: 12px;
}

</style>
	
	<title>检验报告单</title>
	</head>
	<body >
	<object id="LODOP" classid="clsid:2105C259-1E0C-4534-8141-A753534CB4CA" width=0 height=0></object>
	<form>
	<div id="toolbar" style="width: 100%"></div>
	<br>
			<p class="dbt">
					产品质量检验报告单
			</p>
		<div id="maindiv" style="width: 100%"  align="center">
		<br>
 			<table width="80%" >
					<tr height="40">
						<td width="15%" align="left">
							<p class="bq">&nbsp;&nbsp;&nbsp;&nbsp;购货单位:</p>
						</td>
						<td width="35%" >

			        		<div style='float:left' >
			        			<input type="text"  name="ghdw" id="ghdw"   value="<s:property value="vo.ghdw"/>" style="text-align:left;width:90%"/>
			        		</div>
						</td>
						
						<td  width="15%" align="right">
							<p class="bq">NO:</p>
						</td>
						<td width="35%" valign="bottom">
							<input type="text"  class="inputA" name="NO"  id ="NO" style="text-align:left" value="<s:property value="vo.NO"/>" readonly/>
						</td>
					</tr>
				</table>
						
						
		 	<table id="tab1"  width="80%" border="1" align="center"
						cellpadding="0" bordercolor="#139AD2" cellspacing="0"
						style="border-collapse: collapse">
			 <tr height="40">
			 	<td width="15%" align="center"><p class="bq">品种</p></td>
			 	<td width="18%" >
			 		<input type="text" class ="inputA" name="pz" id="pz" value="<s:property value="vo.pz"/>" />
			 	</td>
			 	
			 	<td width="15%" align="center"><p class="bq">代号</p></td>
			 	<td width="18%" valign="bottom">
			 		<input type="text" class ="inputA" name="dh" id="dh" value="<s:property value="vo.dh"/>" readonly/>
			 	</td>
			 	<td width="15%" align="center"><p class="bq">强度等级</p></td>
			 	<td width="19%" valign="bottom">
			 		<input type="text" class ="inputA" name="djqd" id="djqd" value="<s:property value="vo.djqd"/>" readonly/>
			 	</td>
			 </tr>
			 <tr height="40">
			 	<td width="15%" align="center"><p class="bq">出厂编号</p></td>
			 	<td width="18%" valign="bottom">
			 		<input type="text" class ="inputA" name="ccbh" id="ccbh"  value="<s:property value="vo.ccbh"/>"/>
			 	</td>
			 	<td width="15%" align="center"><p class="bq">熟料生产</p></td>
			 	<td width="18%" valign="bottom">
			 		<input type="text" class ="inputA" name="slsc" id="slsc"  value="<s:property value="vo.slsc"/>" />
			 	</td>
			 	<td width="15%" align="center"><p class="bq">旋窑</p></td>
			 	<td width="19%" valign="bottom">
			 		<input type="text" class ="inputA" name="xy" id="xy"  value="<s:property value="vo.xy"/>"/>
			 	</td>
			 </tr>
			 <tr height="40">
			 	<td width="15%" align="center"><p class="bq">购货日期</p></td>
			 	<td width="18%" >
			 		<input type="text" class ="inputA" name="ghrq" id="ghrq"  />
			 	</td>
			 	<td width="15%" align="center"><p class="bq">购货数量(吨)</p></td>
			 	<td width="18%" valign="bottom">
			 		<input type="text" class ="inputA" name="ghsl" id="ghsl"  value="<s:property value="vo.ghsl"/>" onChange="checkedAndFromt(this)" />
			 	</td>
			 	<td width="15%" align="center"><p class="bq">承运人</p></td>
			 	<td width="19%" valign="bottom">
			 		<input type="text" class ="inputA" name="cyr" id="cyr"  value="<s:property value="vo.cyr"/>"/>
			 	</td>
			 </tr>
			 <tr height="40">
			 	<td  width="100%"  align="center" colspan="6">
			 			<p class="bq">技术指标GB175-2007</p>
			 	</td>
			 </tr>
		 	</table>
		 	
		 	
		 	
		 	 <table id="tab2"  width="80%" border="1" align="center" class ="table2"
						cellpadding="0" bordercolor="#139AD2" cellspacing="0"
						style="border-collapse: collapse">
			 
			 <tr height="40">
			 <td width="10%" align="center" class ="table2"> <p class="bq">项目</p> </td>
			 <td width="10%" align="center" class ="table2"> <p class="bq">标准</p> </td>
			 <td width="10%" align="center" class ="table2"> <p class="bq">实际</p> </td>
			 <td width="30%" align="center" class ="table2" colspan="2"> <p class="bq">项目</p> </td>
			 <td width="10%" align="center" class ="table2"> <p class="bq">标准</p> </td>
			 <td width="30%" align="center" class ="table2" colspan="3"> <p class="bq">实际</p> </td>
			 </tr>	
			 
			 <tr height="40">
			 <td width="10%" align="center" class ="table2"> <p class="bq">不溶物%</p> </td>
			 <td width="10%" align="center" class ="table2"> 
			 	<input type="text" class ="inputA" name="bz_brw" id="bz_brw" readonly  value="<s:property value="vo.bz_brw"/>"/>
			 </td>
			 <td width="10%" align="center" class ="table2"> 
			 	<input type="text" class ="inputA" name="sj_brw" id="sj_brw" onChange="checkedAndFromt(this)" value="<s:property value="vo.sj_brw"/>"/>
			 </td>
			 
			 <td width="20%" align="center" class ="table2" rowspan ="2"> 
			 	<p class="bq">凝结时间</p>
			 	<p class="bq">(分钟)</p>
			 </td>
			 <td width="10%" align="center" class ="table2"> <p class="bq">初凝</p>
			 </td>
			 <td width="10%" align="center" class ="table2"> 
			 	<input type="text" class ="inputA" name="bz_ljsj_cl" id="bz_ljsj_cl" value="<s:property value="vo.bz_ljsj_cl"/>" readonly/>
			 </td>
			 <td width="30%" align="center" class ="table2" colspan="3">  
			 	<input type="text" class ="inputA" name="sj_ljsj_cl" id="sj_ljsj_cl" value="<s:property value="vo.sj_ljsj_cl"/>"  onChange="checkedAndFromt(this)"/>
			 </td>
			 </tr>	
			 
			  <tr height="40">
			 <td width="10%" align="center" class ="table2"> <p class="bq">烧失量%</p> </td>
			 <td width="10%" align="center" class ="table2"> 
			 	<input type="text" class ="inputA" name="bz_ssl" id="bz_ssl" value="<s:property value="vo.bz_ssl"/>" readonly />
			</td>
			 <td width="10%" align="center" class ="table2"> 
			 	<input type="text" class ="inputA" name="sj_ssl" id="sj_ssl" value="<s:property value="vo.sj_ssl"/>"  onChange="checkedAndFromt(this)"/>
			 </td>
			 
			 <td width="10%" align="center" class ="table2"> <p class="bq">终凝</p></td>
			 <td width="10%" align="center" class ="table2"> 
			 	<input type="text" class ="inputA" name="bz_ljsj_zl" id="bz_ljsj_zl" value="<s:property value="vo.bz_ljsj_zl"/>"  readonly/>
			 </td>
			 <td width="30%" align="center" class ="table2" colspan="3">  
			 	<input type="text" class ="inputA" name="sj_ljsj_zl" id="sj_ljsj_zl"  value="<s:property value="vo.sj_ljsj_zl"/>"  onChange="checkedAndFromt(this)" />
			 </td>
			 </tr>	
			 
			 <tr height="40">
			 <td width="10%" align="center" class ="table2"> <p class="bq">氧化镁%</p> </td>
			 <td width="10%" align="center" class ="table2"> 
			 	<input type="text" class ="inputA" name="bz_yhm" id="bz_yhm" value="<s:property value="vo.bz_yhm"/>"  readonly/>
			 </td>
			 <td width="10%" align="center" class ="table2">  
			 	<input type="text" class ="inputA" name="sj_yhm" id="sj_yhm" value="<s:property value="vo.sj_yhm"/>"  onChange="checkedAndFromt(this)" />
			 </td>
			 <td width="30%" align="center" class ="table2" colspan="2"> <p class="bq">安全性</p> </td>
			 <td width="10%" align="center" class ="table2"> 
			 	<input type="text" class ="inputA" name="bz_aqx" id="bz_aqx" value="<s:property value="vo.bz_aqx"/>"  readonly/>
			 </td>
			 <td width="30%" align="center" class ="table2" colspan="3"> 
			 	<input type="text" class ="inputA" name="sj_aqx" id="sj_aqx"  value="<s:property value="vo.sj_aqx"/>" />
			 </td>
			 </tr>	
			 
			 
			 <tr height="40">
			 <td width="10%" align="center" class ="table2"> <p class="bq">三氧化硫%</p> </td>
			 <td width="10%" align="center" class ="table2"> 
			 	<input type="text" class ="inputA" name="bz_syhl" id="bz_syhl" value="<s:property value="vo.bz_syhl"/>"  readonly/>
			 </td>
			 <td width="10%" align="center" class ="table2"> 
			 	<input type="text" class ="inputA" name="sj_syhl" id="sj_syhl" value="<s:property value="vo.sj_syhl"/>" onChange="checkedAndFromt(this)"/>
			 </td>
			 
			 <td width="20%" align="center" class ="table2" rowspan ="5">
			 	<p class="bq">3天强度</p>
			 	<p class="bq">(MPa)</p>
			 </td>
			 <td width="10%" align="center" class ="table2" rowspan ="2"><p class="bq">抗折</p></td>
			 
			 <td width="10%" align="center" class ="table2" rowspan ="2"> 
			 	<input type="text" class ="inputA" name="bz_3tqd_kz" id="bz_3tqd_kz" value="<s:property value="vo.bz_3tqd_kz"/>"  readonly />
			 </td>
			 
			 <td width="10%" align="center" class ="table2" >  
			 	<input type="text" class ="inputA" name="sj_3tqd_kz_one" id="sj_3tqd_kz_one" value="<s:property value="vo.sj_3tqd_kz_one"/>" onChange="jskzpjz(this)" />
			 </td>
			 <td width="10%" align="center" class ="table2" >
			 	<input type="text" class ="inputA" name="sj_3tqd_kz_two" id="sj_3tqd_kz_two" value="<s:property value="vo.sj_3tqd_kz_two"/>"  onChange="jskzpjz(this)"/>  
			 </td>
			 <td width="10%" align="center" class ="table2" >  
			 	<input type="text" class ="inputA" name="sj_3tqd_kz_three" id="sj_3tqd_kz_three" value="<s:property value="vo.sj_3tqd_kz_three"/>"  onChange="jskzpjz(this)"/>
			 </td>
			 </tr>	
			 
			 
			 <tr height="40">
			 <td width="10%" align="center" class ="table2"> <p class="bq">氯离子%</p> </td>
			 <td width="10%" align="center" class ="table2">
			 	<input type="text" class ="inputA" name="bz_llz" id="bz_llz" value="<s:property value="vo.bz_llz"/>"  readonly/> 
			 </td>
			 <td width="10%" align="center" class ="table2"> 
			 	<input type="text" class ="inputA" name="sj_llz" id="sj_llz"  value="<s:property value="vo.sj_llz"/>" onChange="checkedAndFromt(this)"/>
			 </td>
			 
			 <td width="30%" align="left" class ="table2" colspan="3"> 
			 	 <div style='float:left'> <p class="bq" >平均=</p></div>
			 	 <div style='float:left'> 
			 	 	<input type="text" class ="inputA" name="sj_3tqd_kz_pz" id="sj_3tqd_kz_pz" value="<s:property value="vo.sj_3tqd_kz_pz"/>"/> 
			 	 </div>
			 </td>
			 </tr>
			 
			 
			 <tr height="40">
			 <td width="10%" align="center" class ="table2"> <p class="bq">比表面积(㎡/㎏)</p> </td>
			 <td width="10%" align="center" class ="table2"> 
			 	<input type="text" class ="inputA" name="bz_bbmj" id="bz_bbmj"  value="<s:property value="vo.bz_bbmj"/>" readonly/>
			 </td>
			 <td width="10%" align="center" class ="table2"> 
			 	<input type="text" class ="inputA" name="sj_bbmj" id="sj_bbmj"  value="<s:property value="vo.sj_bbmj"/>"  onChange="checkedAndFromt(this)"/>
			 </td>
			 
			 <td width="10%" align="center" class ="table2" rowspan ="3"><p class="bq">抗压</p></td>
			 <td width="10%" align="center" class ="table2" rowspan ="3"> 
			 	<input type="text" class ="inputA" name="bz_3tqd_ky" id="bz_3tqd_ky" value="<s:property value="vo.bz_3tqd_ky"/>"  readonly/>
			 </td>
			 
			 <td width="10%" align="center" class ="table2" > 
			 	<input type="text" class ="inputA" name="sj_3tqd_ky_one" id="sj_3tqd_ky_one"  value="<s:property value="vo.sj_3tqd_ky_one"/>"  onChange="jskypjz(this)"/>
			 </td>
			 <td width="10%" align="center" class ="table2" > 
			 	<input type="text" class ="inputA" name="sj_3tqd_ky_two" id="sj_3tqd_ky_two" value="<s:property value="vo.sj_3tqd_ky_two"/>"  onChange="jskypjz(this)"/> 
			 </td>
			 <td width="10%" align="center" class ="table2" > 
			 	<input type="text" class ="inputA" name="sj_3tqd_ky_three" id="sj_3tqd_ky_three"  value="<s:property value="vo.sj_3tqd_ky_three"/>" onChange="jskypjz(this)"/> 
			 </td>
			 </tr>	
			 
			 <tr height="40">
			 <td width="10%" align="center" class ="table2"> <p class="bq">0.08筛余%</p> </td>
			 <td width="10%" align="center" class ="table2"> 
			 	<input type="text" class ="inputA" name="bz_ldlbsy" id="bz_ldlbsy"  value="<s:property value="vo.bz_ldlbsy"/>" readonly/>  
			 </td>
			 <td width="10%" align="center" class ="table2"> 
			 	<input type="text" class ="inputA" name="sj_ldlbsy" id="sj_ldlbsy"  value="<s:property value="vo.sj_ldlbsy"/>" onChange="checkedAndFromt(this)"/>  
			 </td>
			 
			 
			 <td width="10%" align="center" class ="table2" > 
			 	<input type="text" class ="inputA" name="sj_3tqd_ky_four" id="sj_3tqd_ky_four"  value="<s:property value="vo.sj_3tqd_ky_four"/>" onChange="jskypjz(this)"/>  
			 </td>
			 <td width="10%" align="center" class ="table2" >
			 	<input type="text" class ="inputA" name="sj_3tqd_ky_five" id="sj_3tqd_ky_five"  value="<s:property value="vo.sj_3tqd_ky_five"/>" onChange="jskypjz(this)"/>   
			 </td>
			 <td width="10%" align="center" class ="table2" >  
			 	<input type="text" class ="inputA" name="sj_3tqd_ky_six" id="sj_3tqd_ky_six" value="<s:property value="vo.sj_3tqd_ky_six"/>"  onChange="jskypjz(this)"/> 
			 </td>
			 </tr>	
			 
			 
			 <tr height="40">
			 <td width="10%" align="center" class ="table2"> <p class="bq">标准稠度用水量</p> </td>
			 <td width="10%" align="center" class ="table2"> 
			 	<input type="text" class ="inputA" name="bz_bzcdysl" id="bz_bzcdysl"  value="<s:property value="vo.bz_bzcdysl"/>" readonly/> 
			 </td>
			 <td width="10%" align="center" class ="table2"> 
			 	<input type="text" class ="inputA" name="sj_bzcdysl" id="sj_bzcdysl"  value="<s:property value="vo.sj_bzcdysl"/>" onChange="checkedAndFromt(this)" /> 
			 </td>
			 
			 
			 <td width="30%" align="left" class ="table2" colspan="3"> 
			  	  <div style='float:left'> <p class="bq" >平均=</p></div>
			 	 <div style='float:left'> 
			 	 	<input type="text" class ="inputA" name="sj_3tqd_ky_pz" id="sj_3tqd_ky_pz"   value="<s:property value="vo.sj_3tqd_ky_pz"/>" readonly/> 
			 	 </div>
			 </td>
			 </tr>	
			 
		 	</table>
		 	
	 		<table id="tab3"  width="80%" border="1" align="center" class ="table2"
					cellpadding="0" bordercolor="#139AD2" cellspacing="0"
					style="border-collapse: collapse">
				
			<tr height="40">
			 <td width="100%" align="center" class ="table2" colspan="7"> <p class="bq">混&nbsp;&nbsp;&nbsp;&nbsp;合&nbsp;&nbsp;&nbsp;&nbsp;材</p> </td>
			</tr>	
			 	
			<tr height="40">
			 <td width="14%" align="center" class ="table2"> <p class="bq">名称</p> </td>
			 <td width="14%" align="center" class ="table2"> <p class="bq">粉煤灰</p> </td>
			 <td width="14%" align="center" class ="table2"> <p class="bq">石灰石</p> </td>
			 <td width="14%" align="center" class ="table2"> <p class="bq">矿粉</p> </td>
			 <td width="14%" align="center" class ="table2"> <p class="bq">石膏</p> </td>
			 <td width="14%" align="center" class ="table2"> <p class="bq">助磨剂</p> </td>
			 <td width="16%" align="center" class ="table2"> </td>
			</tr>	 	
		
			<tr height="40">
			 <td width="14%" align="center" class ="table2"> <p class="bq">掺量%</p> </td>
			 <td width="14%" align="center" class ="table2"> 
			 	<input type="text" class ="inputA" name="cl_fmh" id="cl_fmh"  value="<s:property value="vo.cl_fmh"/>" onChange="checkedAndFromt(this)"/> 
			 </td>
			 <td width="14%" align="center" class ="table2"> 
			 	<input type="text" class ="inputA" name="cl_shs" id="cl_shs"  value="<s:property value="vo.cl_shs"/>" onChange="checkedAndFromt(this)"/> 
			 </td>
			 <td width="14%" align="center" class ="table2">
			 	<input type="text" class ="inputA" name="cl_kf" id="cl_kf" 	 value="<s:property value="vo.cl_kf"/>" onChange="checkedAndFromt(this)"/>  
			 </td>
			 <td width="14%" align="center" class ="table2"> 
			 	<input type="text" class ="inputA" name="cl_sg" id="cl_sg"   value="<s:property value="vo.cl_sg"/>" onChange="checkedAndFromt(this)"/> 
			 </td>
			 <td width="14%" align="center" class ="table2"> 
			 	<input type="text" class ="inputA" name="cl_zmj" id="cl_zmj" value="<s:property value="vo.cl_zmj"/>" onChange="checkedAndFromt(this)"/> 
			 </td>
			 <td width="16%" align="center" class ="table2"> </td>
			</tr>	 	
		
			<tr height="40">
			 <td width="100%" align="center" class ="table2" colspan="7"> <p class="bq">28天强度待补报</p> </td>
			</tr>	
			 </table>
		 	
		 	
		 	
		 	
		 	
		 	<table width="80%" >
				<tr height="40">
					<td width="10%" align="left">
						<p class="bq">&nbsp;&nbsp;填表人:</p>
					</td>
					<td width="20%" >
						<input type="text"  class="inputA" name="tbr" id="tbr" value="<s:property value="vo.tbr"/>" style="text-align:left" readonly/>
					</td>
					
					<td  width="10%" align = "right">
						<p class="bq">批准人:</p>
					</td>
					<td width="20%"  valign="bottom">
						<input type="text"  class="inputA" name="pzr" id="pzr"  readonly/>
					</td>
					
					<td width="15%" align="left">
						<p class="bq">填报日期:</p>
					</td>
					<td width="25%"   >
						<input type="text"  class="inputA"  name="tbrq" id="tbrq" value="<s:property value="vo.tbrq"/>"/>
					</td>
				</tr>
			</table>
			
			<br>
			<br>
			
	</div>	
	</form>
	
	</body>
</html>