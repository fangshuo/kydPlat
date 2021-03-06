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
	<script type="text/javascript" src="jsp/jxc/xsgl/TuiHuo_print.js"></script>

<style media="print">
.Noprint {display:none;}
.PageBreak {page-break-after: always;}
</style>

	
<style type="text/css">

.table2{
border-top-style: none;
}
.bq
{
	font-size: 12.0pt;
	text-align: center;
}

.nr
{
	font-size: 11.5pt;
	text-align: center;
}
.nr_left
{
	font-size: 11.5pt;
	text-align: left;	
}
.inputA
{ 
	border-left:none; 
    border-right:none;
    border-top:none;  
    border-bottom:none; 
    text-align: center;
} 


</style>
	
	<title>退货单打印</title>
	</head>
	<body>
	<div class="Noprint" id="toolbar" style="width: 100%"></div>
	<object id="LODOP" classid="clsid:2105C259-1E0C-4534-8141-A753534CB4CA" width=0 height=0></object>

	<div class="banktitle">
			<p class="dbt2">
					淮安市楚城水泥有限公司销售联单
			</p>
	
			<table width="99%" align="center">
				<tr height="30">
					<td width="20%" >
						<p class="bq"> 开票日期: </p>
					</td>
					<td width="30%" >
						<p class="nr_left">  <input type="text"  name="kpsj" id="kpsj"  class="inputA" value="<s:property value="xsdvo.kpsj"/>" readonly/> </p>
					</td>
					
					<td  width="20%">
						<p class="bq">计划单号:</p>
					</td>
					<td width="30%" >
						<p class="nr_left"> <input type="text"  name="jhdh" id="jhdh"  class="inputA" value="<s:property value="xsdvo.jhdh"/>" readonly/> </p>
					</td>
				</tr>
			</table>
			
						
		 	<table id="tab1" width="99%" border="1" align="center"
						cellpadding="0" bordercolor="#139AD2" cellspacing="0"
						style="border-collapse: collapse">
			 <tr height="30">
			 
			 <td width="25%" ><p class="bq">客户名称</p></td>
		    	<td   width="20%" > 
		 			<p class="nr"> <input type="text"  name="khmc" id="khmc"  class="inputA" value="<s:property value="xsdvo.khmc"/>" readonly/> </p>
		 		</td>
			 	
			 	<td  width="15%" >
			 		<p class="bq">子客户名称</p>
			 	</td>
			 	<td  width="35%" colspan="2" >
			 		<p class="nr"> <input type="text"  name="zkhmc" id="zkhmc"  class="inputA" value="<s:property value="xsdvo.zkhmc"/>" readonly/> </p>
			 	</td>
			 	
			 </tr>

			 <tr height="30">
			 	<td>
			 		<p class="bq">品种规格</p>
			 	</td>
			    <td>
			 		<p class="bq">数量(吨)</p>
			 	</td>
			 	<td>
			 		<p class="bq">单价(元)</p>
			 	</td>
			 	<td>
			 		<p class="bq">金额(元)</p>
			 	</td>
			 	<td>
			 		<p class="bq">备注</p>
			 	</td>
			 </tr>
			  
			 <tr height="30">
			 	<td width="25%" > 
			 		<p class="nr"> <input type="text"  name="pzgg" id="pzgg"  class="inputA" value="<s:property value="xsdvo.pzgg"/>" readonly/></p>
			 	</td>
			    <td width="20%" > 
			 		<p class="nr"> <input type="text"  name="sl" id="sl"  class="inputA" value="<s:property value="xsdvo.sl"/>" readonly/></p>
			 	</td>
			 	<td width="15%"> 
			 		<p class="nr"> <input type="text"  name="dj" id="dj"  class="inputA" value="<s:property value="xsdvo.dj"/>" readonly/></p>
			 	</td>
			 	
			 	<td width="15%" > 
			 		<p class="nr"> <input type="text"  name="je" id="je"  class="inputA" value="<s:property value="xsdvo.je" />"readonly/></p>
			 	</td>
			 	<td width="25%" > 
			 		<p class="nr"> <input type="text"  name="bz" id="bz"  class="inputA" value="<s:property value="xsdvo.bz"/>"readonly/></p>
			 	</td>
			 </tr>	
			 
			  <tr height="30">
			 	<td >
			 		<p class="bq">大写金额</p>
			 	</td>
			    <td  valign="bottom" colspan = "4"> 
			 		<p class="nr"> <input type="text"  name="dxje" id="dxje"  class="inputA" value="<s:property value="xsdvo.dxje"/>" readonly/> </p>
			 	</td>
			 </tr>		 
			 
			  <tr height="30">
			 	<td  width="100%" colspan="8">
			 		<p class="nr_left">&nbsp;&nbsp;&nbsp;&nbsp;备注:&nbsp;&nbsp;&nbsp;&nbsp;
			 			本开票单仅为销售计划依据，与发货凭证无关。
			 		</p>
			 	</td>
			 </tr>
		 	</table>
		 	<table width="99%"  align="center" >
				<tr height="30">
					<td width="20%">
						<p class="bq">开票员:</p>
					</td>
					<td width="15%">
						<p class="nr"> <input type="text"  name="kpy" id="kpy"  class="inputA" value="<s:property value="xsdvo.kpy"/>" readonly/> </p>
					</td>
					
					<td  width="15%">
						<p class="bq">收款员:</p>
					</td>
					<td width="15%">
						
					</td>
					
					<td width="20%">
						<p class="bq">单位盖章:</p>
					</td>
					<td width="15%" >
					
					</td>
				</tr>
			</table>
		</div>	
	</body>
</html>