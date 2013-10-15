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
	<script type="text/javascript" src="jsp/jxc/xsgl/FaHuoDan_print.js"></script>
	
<style media="print">
.Noprint {display:none;}
.PageBreak {page-break-after: always;}
</style>

<style type="text/css">
.table2
{
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
	
	<title>发货单打印</title>
	</head>
	<body>
	<div class="Noprint" id="toolbar" style="width: 100%"></div>
	<object id="LODOP" classid="clsid:2105C259-1E0C-4534-8141-A753534CB4CA" width=0 height=0></object>
	<div class="banktitle">
			<p class="dbt2">
					淮安市楚城水泥有限公司袋装水泥发货单
			</p>
	
			<table width="99%" align="center">
				<tr height="25">
					<td width="20%">
						<p class="bq">发货时间:</p>
					</td>
					<td width="30%" >
						<p class="nr_left"> <input type="text"  name="fhsj" id="fhsj"  class="inputA" value="<s:property value="fhdvo.fhsj"/>" readonly/> </p>
					</td>
					
					<td  width="20%" >
						<p class="bq">发货单号:</p>
					</td>
					<td width="30%" >
						<p class="nr_left"> <input type="text"  name="fhdh" id="fhdh"  class="inputA" value="<s:property value="fhdvo.fhdh"/>" readonly/> </p>
					</td>
				</tr>
			</table>
						
		 	<table id="tab1"  width="99%" border="1" align="center"
						cellpadding="0" bordercolor="#139AD2" cellspacing="0"
						style="border-collapse: collapse">
						
			 <tr height="30">
			 	<td  width="10%">
			 		<p class="bq">客户名称</p>
			 	</td>
			 	<td width="20%">
			 		<p class="nr"> <input type="text"  name="khmc" id="khmc"  class="inputA" value="<s:property value="fhdvo.khmc"/>" readonly/> </p>
			 	</td>
			 	
			 	<td width="11%" ><p class="bq">子客户名称</p></td>
			 	<td width="29%"> 
			 		<p class="nr">  <input type="zkhmc"  name="zkhmc" id="zkhmc"  class="inputA" value="<s:property value="fhdvo.zkhmc"/>" readonly/> </p>
			 	</td>
			 	<td width="10%" align="center"><p class="bq">转入数量</p></td>
			 	<td width="20%"  valign="center"> 
			 		<p class="nr">  <input type="zrsl"  name="zrsl" id="kpsj"  class="inputA" value="<s:property value="fhdvo.zrsl"/>" readonly/> </p>
			
			 	</td>
			 </tr>
			 
			 <tr height="30">
			 	<td ><p class="bq">计划单号</p></td>
			 	<td >
			 		<p class="nr">  <input type="text"  name="jhdh" id="jhdh"  class="inputA" value="<s:property value="fhdvo.jhdh"/>" readonly/> </p>
			 	</td>
			 	
			 	
			 	<td  nowrap="nowrap">
			 		<p class="bq">品种规格</p>
			 	</td>
			 	<td > 
			 		<p class="nr"> <input type="text"  name="pzgg" id="pzgg"  class="inputA" value="<s:property value="fhdvo.pzgg"/>" readonly/> </p>
			 	</td>
			 
			 	<td width="10%" align="center"><p class="bq">转出数量</p></td>
			 	<td width="20%"  valign="center"> 
			 		<p class="nr">  <input type="text"  name="zcsl" id="zcsl"  class="inputA" value="<s:property value="fhdvo.zcsl"/>" readonly/> </p>
			
			 	</td>			 
			 </tr>	
			 </table>
			 <table id="tab1"  width="99%" border="1" align="center"
						cellpadding="0" bordercolor="#139AD2" cellspacing="0"
						style="border-collapse: collapse" class ="table2">
			 
			 <tr height="30" >
			 	<td  width="6%"  rowspan="3" class ="table2">
			 		<p class="bq">本</p><p class="bq">次</p>
			 		<p class="bq">发</p><p class="bq">货</p>
			 	</td>
			 	
			 	<td  width="19%" class ="table2">
			 		<p class="bq">发货数量(吨)</p>
			 	</td>
			 	
			 	<td  width="10%" nowrap="nowrap" class ="table2"> 
			 		<p class="nr"> <input type="text"  name="fhsl" id="fhsl"  class="inputA" value="<s:property value="fhdvo.fhsl"/>" readonly/> </p>
			 	</td>
			 	
			 	<td  width="6%"   rowspan="3" class ="table2">
			 		<p class="bq">发</p><p class="bq">货</p>
			 		<p class="bq">记</p><p class="bq">录</p>
			 	</td>
			 	
			 	<td  width="14%"  class ="table2">
			 		<p class="bq">计划数量(吨)</p>
			 	</td>
			 	<td  width="15%" class ="table2"> 
			 		<p class="nr"> <input type="text"  name="jhsl" id="jhsl"  class="inputA" value="<s:property value="fhdvo.jhsl"/>" readonly/>  </p>
			 	</td>
			 	<td  width="10%" class ="table2"><p class="bq">承运单位</p></td>
			 	<td  width="20%" class ="table2">
			 		<p class="nr"> <input type="text"  name="cydw" id="cydw"  class="inputA" value="<s:property value="fhdvo.cydw"/>" readonly/> </p>
			 	</td>	
			 </tr>
			 
			 <tr height="30">
			 	<td   >
			 		<p class="bq">折合袋装(袋)</p>
			 	</td>
			 	<td   nowrap="nowrap" > 
			 	<p class="nr">	<input type="text"  name="zhdz" id="zhdz"  class="inputA" value="<s:property value="fhdvo.zhdz"/>" readonly/> </p>
			 	</td>
			 	
			 	<td   >
			 		<p class="bq">发货累计(吨)</p>
			 	</td>
			 	<td   > 
			 		<p class="nr"> <input type="text"  name="fhlj" id="fhlj"  class="inputA" value="<s:property value="fhdvo.fhlj"/>" readonly/> </p>
			 	</td>
			 	<td   nowrap="nowrap" >
			 		<p class="bq">承运车号</p>
			 	</td>
			 	<td   nowrap="nowrap" > 
			 		<p class="nr"> <input type="text"  name="cych" id="cych"  class="inputA" value="<s:property value="fhdvo.cych"/>" readonly/> </p>
			 	</td>
			 </tr>
			 
			  <tr height="30">
			 	<td>
			 		<p class="bq">空车重量</p>
			 	</td>
			 	<td> 
			 		<p class="nr"> <input type="text"  name="kczl" id="kczl"  class="inputA" value="<s:property value="fhdvo.kczl"/>" readonly/>   </p>
			 	</td>
			 	
			 	<td><p class="bq">余&nbsp;&nbsp;数(吨)</p></td>
			 	<td> 
			 		<p class="nr"> <input type="text"  name="ys" id="ys"  class="inputA" value="<s:property value="fhdvo.ys"/>" readonly/>  </p>
			 	</td>
			 	
			 	<td     nowrap="nowrap"><p class="bq">出厂编号</p></td>
			 	<td    nowrap="nowrap"> 
			 		<p class="nr">  <input type="text"  name="ccbh" id="ccbh"  class="inputA" value="<s:property value="fhdvo.ccbh"/>" readonly/> </p>
			 	</td>
			 </tr>
			 
			  <tr height="30">
			 	<td  width="100%" colspan="8">
			 		<p class="nr_left">&nbsp;&nbsp;&nbsp;&nbsp;备注:&nbsp;&nbsp;&nbsp;&nbsp;
			 			发货单自开具时间24小时内有效，超时作废。
			 		</p>
			 	</td>
			 </tr>
		 	</table>
		 	
		 	
		 	
		 	<table width="99%"  align="center" >
				<tr height="25">
					<td width="10%" >
						<p class="bq">换票员:</p>
					</td>
					<td width="15%" >
						<p class="nr"> <input type="text"  name="kpy" id="kpy"  class="inputA" value="<s:property value="fhdvo.kpy"/>" readonly/> </p>
					</td>
					
					<td  width="10%"  >
						<p class="bq">发货员:</p>
					</td>
					<td width="15%">
					</td>
					
					<td  width="10%"  >
						<p class="bq">驾驶员:</p>
					</td>
					<td width="15%" >
					</td>
					
					<td width="10%" >
						<p class="bq">客户签收:</p>
					</td>
					<td width="15%" >
						
					</td>
				</tr>
			</table>
		</div>	
	</body>
</html>