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

	<script type="text/javascript" src="javascript/common/print.js"></script>
	<script type="text/javascript" src="javascript/common.js"></script>
	<script type="text/javascript" src="jsp/jxc/xsgl/AddJianYanbbdTWO.js"></script>
	
	<style media="print">
.Noprint {display:none;}
.PageBreak {page-break-after: always;}
</style>

	<style type="text/css">

.inputA
{ 
	border-left:none; 
    border-right:none;
    border-top:none;  
    border-bottom:none; 
    width: 100%;
    height:20px;
    font-size: 15px;
    text-align: center;
} 
.inputB
{ 
	border-left:none; 
    border-right:none;
    border-top:none;  
    border-bottom:none; 
}
       

.table2{
border-top-style: none;
}

.bq
{
	font-size: 12.0pt;
}


.gjz {
	color: #FF0000;
	font-size: 12px;
}

</style>
	
	<title>检验报告单</title>
	</head>
	<body style="width: 300px">
	
	

	<div id="toolbar" class="Noprint" style="width: 100%"></div>
	<OBJECT classid="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2" id="wb" width="0" height="0"></OBJECT>
	<div class="banktitle">
	<br>
			<p class="dbt3">
					楚城牌水泥质量检验报告单
			</p>
			<p class="dbt3">（28天强度补报单）</p>
	
		<br>
 			<table width="80%" >
					<tr height="20">
						<td width="30%" align="left">
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
			 <tr height="20">
			 	<td width="10%" align="center"  colspan="2"><p class="bq">品种</p></td>
			 	<td width="90%"   colspan="5">
			 		<input type="text" class ="inputA" name="pz" id="pz" value="<s:property value="vo.pz"/>" />
			 	</td>
			 
			 </tr>
			 <tr height="20">
			 	<td width="15%" align="center"  colspan="2"><p class="bq">强度等级</p></td>
			 	<td width="18%" colspan="5">
			 		<input type="text" class ="inputA" name="djqd" id="djqd" value="<s:property value="vo.djqd"/>" />
			 	</td>
			 
			 </tr>
			 <tr height="20">
			 	<td width="15%" align="center"  colspan="2"><p class="bq">出厂编号</p></td>
			 	<td width="18%" valign="bottom" colspan="5">
			 		<input type="text" class ="inputA" name="ccbh" id="ccbh"  value="<s:property value="vo.ccbh"/>"/>
			 	</td>
			 
			 </tr>
			 <tr height="20">
			 	<td width="15%" align="center"  colspan="2"><p class="bq">购货日期</p></td>
			 	<td width="18%" colspan="5">
			 		<input type="text" class ="inputA" name="ghrq" id="ghrq"  />
			 	</td>
			 	
			 </tr>


			  <tr height="20">
			 	<td width="15%" align="center"  colspan="2"><p class="bq">购入数量</p></td>
			 	<td width="18%" colspan="5">
			 		<input type="text" class ="inputA" name="ghsl" id="ghsl" value="<s:property value="vo.ghsl"/>" />
			 	</td>
			 
			 </tr>
			
			 
			 <tr height="20">
			 <td width="30%" align="center" class ="table2" colspan="2"> <p class="bq">项&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;目</p> </td>
			 <td width="10%" align="center" class ="table2"> <p class="bq">标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;准</p> </td>
			 <td width="30%" align="center" class ="table2" colspan="3"> <p class="bq">实&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;际</p> </td>
			 </tr>	
			 
			
			 
			 <tr height="20">
			
			 
			 <td width="20%" align="center" class ="table2" rowspan ="5">
			 	<p class="bq">28d强度</p>
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
			 
			 
			 <tr height="20">
			
			 <td width="30%" align="left" class ="table2" colspan="3"> 
			 	 <div style='float:left'> <p class="bq" >平均=</p></div>
			 	 <div style='float:left'> 
			 	 	<input type="text" class ="inputA" name="sj_3tqd_kz_pz" id="sj_3tqd_kz_pz" value="<s:property value="vo.sj_3tqd_kz_pz"/>"/> 
			 	 </div>
			 </td>
			 </tr>
			 
			 
			 <tr height="20">
			
			 
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
			 
			 <tr height="20">
			
			 
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
			 
			 
			 <tr height="20">
			 
			 
			 <td width="30%" align="left" class ="table2" colspan="3"> 
			  	  <div style='float:left'> <p class="bq" >平均=</p></div>
			 	 <div style='float:left'> 
			 	 	<input type="text" class ="inputA" name="sj_3tqd_ky_pz" id="sj_3tqd_ky_pz"   value="<s:property value="vo.sj_3tqd_ky_pz"/>" readonly/> 
			 	 </div>
			 </td>
			 </tr>	
			 <tr height="20">
			 <td width="100%" align="center" class ="table2" colspan="7"> <p class="bq">备&nbsp;&nbsp;&nbsp;&nbsp;注</p> </td>
			</tr>	
			
			<tr height="40">
			 <td width="100%" align="center" class ="table2" colspan="7"><textarea class="inputB" name="bz" id="bz" cols="60" rows="2" ><s:property value="vo.bz"/></textarea></td>
			</tr>
		 	</table>
		 	
		 	
		 	<table width="80%" >
				<tr height="40">
					<td width="15%" align="left">
						<p class="bq">&nbsp;&nbsp;填表人:</p>
					</td>
					<td width="10%" >
						<input type="text"  class="inputA" name="tbr" id="tbr" value="<s:property value="vo.tbr"/>" style="text-align:left" size="10" readonly/>
					</td>
					
					<td  width="15%" align = "right">
						<p class="bq">批准人:</p>
					</td>
					<td width="10%"  valign="bottom">
						<input type="text"  class="inputA" name="pzr" id="pzr" size="10"  readonly/>
					</td>
					
					<td width="20%" align="right">
						<p class="bq">填报日期:</p>
					</td>
					<td width="15%"   >
						<input type="text"  class="inputA"  name="tbrq" id="tbrq" value="<s:property value="vo.tbrq"/>" size="10"/>
					</td>
				</tr>
			</table>
			
			<br>
			<br>
			
	</div>	

	
	</body>
</html>