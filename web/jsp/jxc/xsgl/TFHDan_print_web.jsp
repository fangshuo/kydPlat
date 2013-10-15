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
	<script type="text/javascript" src="jsp/jxc/xsgl/TFHDan_print_web.js"></script>
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
	
	<title>散装水泥分提发货单</title>
	</head>
	<body>
	<div class="Noprint" id="toolbar" style="width: 100%"></div>
	<object id="LODOP" classid="clsid:2105C259-1E0C-4534-8141-A753534CB4CA" width=0 height=0></object>
	<div class="banktitle">
			<p class="dbt2">
					淮安市楚城水泥有限公司散装水泥分提发货(磅)单
			</p>
		
		 			<table width="99%" >
							<tr height="30">
								<td width="20%">
									<p class="bq">发货时间:</p>
								</td>
								<td width="30%">
									<p class="nr_left"> <s:property value="fhdvo.fhsj"/> </p>
								</td>
								
								<td  width="20%">
									<p class="bq">提发货单号:</p>
								</td>
								<td width="30%">
									<p class="nr_left"> <s:property value="fhdvo.tfhdh"/> </p>
								</td>
							</tr>
						</table>
						
						
		 	<table id="tab1"  width="99%" border="1" align="center"
						cellpadding="0" bordercolor="#139AD2" cellspacing="0"
						style="border-collapse: collapse">
			 <tr height="30">
	            <td width="10%" ><p class="bq">客户名称</p></td>
			 	<td width="24%"> 
			 		<p class="nr"> <s:property value="fhdvo.khmc"/> </p>
			 	</td>
			 	<td width="11%" ><p class="bq">子客户名称</p></td>
			 	<td width="22%"> 
			 	  <p class="nr">   <s:property value="fhdvo.zkhmc"/> </p>
			 	</td>
			 	<td width="19%" align="center"><p class="bq">转入数量</p></td>
			 	<td width="14%"  valign="center"> 
			 	 <p class="nr">   <s:property value="fhdvo.zrsl"/></p>
			
			 	</td>
			 </tr>
			 <tr height="30">
			 	<td><p class="bq">计划单号</p></td>
			 	<td> 
			 		  <p class="nr">  <s:property value="fhdvo.jhdh"/></p>
			 	</td>
			 	<td >
				 	<p class="bq">品种规格</p>
				 </td>
				 <td>
				 		 <p class="nr"> <s:property value="fhdvo.pzgg"/> </p>
				 </td>

			 	<td  valign="center"><p class="bq">转出数量</p></td>
			 	<td  valign="center"> 
			 	 <p class="nr"> <s:property value="fhdvo.zcsl"/> </p>
			
			 	</td>
			 </tr>	
			 
			 <tr height="30">
			 
				 <td >
				 	<p class="bq">发放库号</p>
				 </td>
			 	<td  >
			 		<p class="nr"> <s:property value="fhdvo.ffkh"/> </p>
			 	</td>	
			    <td><p class="bq">承运单位</p></td>
			 	<td >
					  <p class="nr"> <s:property value="fhdvo.cydwmc"/> </p>
			 	</td>
				 
				<td><p class="bq">承运车辆</p></td>
			 	<td>
			 	<p class="nr"><s:property value="fhdvo.cyclbm"/></p>
			 </td>	
			 </tr>	
			 </table>
			 
			 
			 <table id="tab1"  width="99%" border="1" align="center"
						cellpadding="0" bordercolor="#139AD2" cellspacing="0"
						style="border-collapse: collapse" class ="table2">			 
	
			 <tr height="30" >
			 	<td  width="6%"  rowspan="3" class ="table2">
			 		<p class="bq">过</p><p class="bq">磅</p>
			 		<p class="bq">记</p><p class="bq">录</p>
			 	</td>
			 	
			 	<td  width="14%"  class ="table2">
			 		<p class="bq">空车重量(吨)</p>
			 	</td>
			 	<td  width="14%" class ="table2" nowrap="nowrap" > 
			 		<p class="nr"> <s:property value="fhdvo.kczl"/></p>
			 	</td>
			 	
			 	<td  width="5%"  rowspan="3" class ="table2">
			 		<p class="bq">发</p><p class="bq">货</p>
			 		<p class="bq">记</p><p class="bq">录</p>
			 	</td>
			 	
			 	<td  width="14%" class ="table2">
			 		<p class="bq">计划数量(吨)</p>
			 	</td>
			 	<td  width="14%" class ="table2" > 
			 		<p class="nr"><s:property value="fhdvo.jhsl"/> </p>
			 	</td>
			 	
			 	
			 	
			 	<td  width="5%"   rowspan="3" class ="table2">
			 		<p class="bq">回</p><p class="bq">车</p>
			 		<p class="bq">过</p><p class="bq">磅</p>
			 	</td>
			 	<td  width="14%"  class ="table2">
			 		<p class="bq">回车重量(吨)</p>
			 	</td>
			 	<td  width="14%" class ="table2" > 
			 		<p class="nr"> <s:property value="fhdvo.hczl"/> </p>
			 	</td>
			 </tr>
			 
			 
			 
			  <tr height="30">
			 	<td>
			 		<p class="bq">装车重量(吨)</p>
			 	</td>
			 	<td   nowrap="nowrap" > 
			 		<p class="nr"> <s:property value="fhdvo.zczl"/> </p>
			 	</td>
			 	
			 	<td>
			 		<p class="bq">发货累计(吨)</p>
			 	</td>
			 	<td  > 
			 		<p class="nr"><s:property value="fhdvo.fhlj"/> </p>
			 	</td>
			 	
			 	<td>
			 		<p class="bq">实发重量(吨)</p>
			 	</td>
			 	<td> 
			 	<p class="nr"><s:property value="fhdvo.sfzl"/></p>
			 	</td>
			 </tr>
			 
			 <tr height="30">
			 	<td>
			 		<p class="bq">净重数量(吨)</p>
			 	</td>
			 	<td nowrap="nowrap"> 
			 		<p class="nr">	<s:property value="fhdvo.jzsl"/></p>
			 	</td>
			 	
			 	<td>
			 		<p class="bq">余&nbsp;&nbsp;数(吨)</p>
			 	</td>
			 	<td> 
			 		<p class="nr"> <s:property value="fhdvo.ys"/></p>
			 	</td>
			 	
			 	<td>
			 		<p class="bq">出厂编号</p>
			 	</td>
			 	<td> 
					<p class="nr"> <s:property value="fhdvo.ccbh"/> </p>
			 	</td>
			 </tr>
			 
		 	</table>
		 	<table width="99%" >
				<tr height="30">
					<td width="10%" >
						<p class="bq">司磅员:</p>
					</td>
					<td width="15%"  >
					<p class="nr"> 	<s:property value="fhdvo.kpy"/></p>
					</td>
					
					<td  width="10%">
						<p class="bq">发货员:</p>
					</td>
					<td width="15%" >
						
					</td>
					
					<td  width="10%">
						<p class="bq">驾驶员:</p>
					</td>
					<td width="15%" >
						
					</td>
					
					<td width="15%" >
						<p class="bq">客户签收:</p>
					</td>
					<td width="10%" >
						
					</td>
				</tr>
			</table>
			
		</div>	
	</body>
</html>