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
	<script type="text/javascript" src="jsp/jxc/xsgl/yuShowDan_print_web.js"></script>

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



</style>
	
	<title>订货单打印</title>
	</head>
	<body>
	<div class="Noprint" id="toolbar" style="width: 100%"></div>
	<OBJECT classid="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2" id="wb" width="0" height="0"></OBJECT>

	<div class="banktitle">
			<p class="dbt2">
					楚城水泥客户订货单
			</p>
	
			<table width="99%" align="center">
				<tr height="30">
					<td width="20%" >
						<p class="bq"> 日期: </p>
					</td>
					<td width="30%" >
						<p class="nr_left"> <s:property value="ysdvo.kpsj"/> </p>
					</td>
					
					<td  width="20%">
						<p class="bq">单号:</p>
					</td>
					<td width="30%" >
						<p class="nr_left"> <s:property value="ysdvo.jhdh"/> </p>
					</td>
				</tr>
			</table>
			
						
		 	<table id="tab1" width="99%" border="1" align="center"
						cellpadding="0" bordercolor="#139AD2" cellspacing="0"
						style="border-collapse: collapse">
			 <tr height="30">
			 
			 <td width="25%" ><p class="bq">客户名称</p></td>
		    	<td   width="20%" colspan="4"> 
		 			<p class="nr"> <s:property value="ysdvo.khmc"/> </p>
		 		</td>
			 	
			 </tr>

			 <tr height="30">
			 	<td  align="center">
			 		<p class="bq">品种规格</p>
			 	</td>
			    <td  align="center">
			 		<p class="bq">本次数量(吨)</p>
			 	</td>
			 	<td  align="center">
			 		<p class="bq">单价(元)</p>
			 	</td>
			 	<td  align="center">
			 		<p class="bq">金额(元)</p>
			 	</td>
			 	<td  align="center">
			 		<p class="bq">备注</p>
			 	</td>
			 </tr>
			  
			 <tr height="30">
			 	<td width="20%" > 
			 		<p class="nr"> <s:property value="ysdvo.pzgg"/></p>
			 	</td>
			    <td width="20%" > 
			 		<p class="nr"> <s:property value="ysdvo.sl"/></p>
			 	</td>
			 	<td width="20%"> 
			 		<p class="nr"> <s:property value="ysdvo.dj"/></p>
			 	</td>
			 	
			 	<td width="20%" > 
			 		<p class="nr"> <s:property value="ysdvo.je" /></p>
			 	</td>
			 	<td width="20%" > 
			 		<p class="nr"> <s:property value="ysdvo.bz"/></p>
			 	</td>
			 </tr>	
			 
			  <tr height="30">
			 	<td >
			 		<p class="bq">大写金额</p>
			 	</td>
			    <td  valign="bottom" colspan = "4"> 
			 		<p class="nr"> <s:property value="ysdvo.dxje"/> </p>
			 	</td>
			 </tr>		 
			 
			  <tr height="30">
			 	<td  width="100%" colspan="8">
			 		<p class="nr_left">&nbsp;&nbsp;&nbsp;&nbsp;备注:&nbsp;&nbsp;&nbsp;&nbsp;
			 			本订货单仅为订货依据，与实际销售、发货无关。
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
						<p class="nr"> <s:property value="ysdvo.kpy"/> </p>
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