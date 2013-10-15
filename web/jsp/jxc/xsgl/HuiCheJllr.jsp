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
	<script type="text/javascript" src="jsp/jxc/xsgl/HuiCheJllr.js"></script>
	<style type="text/css">

.inputA{ 
	border-left:none; 
    border-right:none;
    border-top:none;  
    border-bottom:none;  
    width: 100%;
    height:30px;
    font-size: 15px;
    text-align: center;
    } 
    
.inputB{ 
	border-left:none; 
    border-right:none;
    border-top:none;  
    border-bottom:1 solid #139AD2;  
    width: 80%;
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
	text-align: center;
}
.gjz {
	color: #FF0000;
	font-size: 12px;
}
</style>
	
	<title>回车重量录入</title>
	</head>
	<body>
	<form>
	<div id="toolbar" style="width: 100%"></div>
	<br>
			<p class="dbt">
					回车重量录入
			</p>
		<div id="maindiv" style="width: 100%"  align="center">
		<br>
		
		<table width="95%" height="25" border="0" align="center"
						background="images/tz.gif" cellpadding="0" cellspacing="0">
						<tr>
							<td width="6%" align="center">
								&gt;&gt;
							</td>
							<td width="94%" align="left">
								回车重量录入
							</td>
						</tr>
					</table>
				<br>
					
			<table width="95%" >
				<tr height="40">
					<td width="15%" align="left">
						<p class="bq">&nbsp;&nbsp;&nbsp;&nbsp;发货时间:</p>
					</td>
					<td width="35%" valign="center">
						<input type="text" class="inputA" name="fhsj" id="fhsj" style="text-align:left"  readonly/>
					</td>
					
					<td  width="15%">
						<p class="bq">提发货单号:</p>
					</td>
					<td width="35%" >
						<input type="text"  class="inputB" name="tfhdh"  id ="tfhdh" style="text-align:left" />
					</td>
				</tr>
			</table>
						
						
		 	<table id="tab1"  width="90%" border="1" align="center"
						cellpadding="0" bordercolor="#139AD2" cellspacing="0"
						style="border-collapse: collapse">
						
			 <tr height="40">
	            <td width="20%" colspan="2"><p class="bq">客户名称</p></td>
			 	<td width="33%"  colspan="3" > 
			 		<input  class="inputA" type="text" name="khmc" id="khmc" readonly/>
			 	</td>
			 	<td width="14%" ><p class="bq">子客户名称</p></td>
			 	<td width="33%" colspan="3" valign="center"> 
			 		<input  class="inputA"  type="text"  id="zkhmc" name="zkhmc" readonly />
			 	</td>
			 </tr>
			 
			 <tr height="40">
			 	<td colspan="2" ><p class="bq">计划单号</p></td>
			 	<td  colspan="3" valign="center"> 
			 		<input  type="text" class ="inputA" id="jhdh" name="jhdh"  readonly/>
			 	</td>
			 	<td  align="center"><p class="bq">承运单位</p></td>
			 	<td colspan="3" valign="center">
			 		<input class="inputA" type="text" id="cydw" name="cydw" readonly/>
			 	</td>
			 </tr>	
			 
			 <tr height="40">
				 <td width="20%" colspan="2"  class ="table2">
				 	<p class="bq">品种规格</p>
				 </td>
				 <td width="19%" colspan="2" valign="center" class ="table2">
				 		<input type="text" class ="inputA" name="pzgg" id="pzgg"  readonly/>
				 		<input type="hidden"  name="spbm" id="spbm" />
				 </td>
				 <td width="14%" class ="table2">
				 	<p class="bq">发放库号</p>
				 </td>
			 	<td width="14%" valign="center" class ="table2">
			 		<input type="text" class ="inputA" name="ffkh" id="ffkh"  readonly/>
			 	</td>	
				 
				 <td width="19%" colspan="2"  class ="table2">
				 	<p class="bq">承运车辆</p>
				 </td>
			 	<td width="14%" valign="center" class ="table2">
			 		<input type="text" class ="inputA" name="cycl" id="cycl"  readonly/>
			 	</td>	
			 </tr>	
			 
			<tr>
			 	<td  width="6%"  rowspan="3" class ="table2">
			 		<p class="bq">过</p><p class="bq">磅</p>
			 		<p class="bq">记</p><p class="bq">录</p>
			 	</td>
			 	
			 	<td  width="14%"  class ="table2">
			 		<p class="bq">空车重量(吨)</p>
			 	</td>
			 	<td  width="14%" class ="table2" nowrap="nowrap" valign="bottom"> 
			 		<input type="text" class ="inputA" id="kczl"  name="kczl"  readonly/>
			 	</td>
			 	
			 	<td  width="5%"   rowspan="3" class ="table2">
			 		<p class="bq">发</p><p class="bq">货</p>
			 		<p class="bq">记</p><p class="bq">录</p>
			 	</td>
			 	
			 	<td  width="14%"  class ="table2">
			 		<p class="bq">计划数量(吨)</p>
			 	</td>
			 	<td  width="14%" class ="table2" valign="bottom"> 
			 		<input type="text" class ="inputA" name="jhsl"  id="jhsl" readonly/>
			 	</td>
			 	
			 	<td  width="5%"   rowspan="3" class ="table2">
			 		<p class="bq">回</p><p class="bq">车</p>
			 		<p class="bq">过</p><p class="bq">磅</p>
			 	</td>
			 	<td  width="14%" class ="table2">
			 		<p class="bq">回车重量(吨)</p>
			 	</td>
			 	<td  width="14%" class ="table2" valign="bottom"> 
			 		<input type="text" class ="inputA" name="hczl" id="hczl"  onChange="jsdataByhczl(this)"  />
			 	</td>
			 </tr>
			 
			 
			 <tr height="40">
			 	<td  >
			 		<p class="bq">装车重量(吨)</p>
			 	</td>
			 	<td   nowrap="nowrap" valign="bottom"> 
			 		<input type="text" class ="inputA" name="zczl"  id="zczl" readonly/>
			 	</td>
			 	
			 	<td >
			 		<p class="bq">发货累计(吨)</p>
			 	</td>
			 	<td   valign="bottom"> 
			 		<input type="text" class ="inputA" id="fhlj" name="fhlj"  readonly />
			 	</td>
			 	
			 	<td  >
			 		<p class="bq">实发重量(吨)</p>
			 	</td>
			 	<td   valign="bottom"> 
			 		<input type="text" class ="inputA" name="sfzl" id="sfzl"  readonly  />
			 	</td>
			 </tr>
			 
			 <tr height="40">
			 	<td >
			 		<p class="bq">净重数量(吨)</p>
			 	</td>
			 	<td   nowrap="nowrap" valign="bottom"> 
			 		<input type="text" class ="inputA" name="jzsl"  id="jzsl" readonly/>
			 	</td>
			 	
			 	<td  >
			 		<p class="bq">余&nbsp;&nbsp;数(吨)</p>
			 	</td>
			 	<td  valign="bottom"> 
			 		<input type="text" class ="inputA" id="ys" name="ys"  readonly />
			 	</td>
			 	
			 	<td  >
			 		<p class="bq">出厂编号</p>
			 	</td>
			 	<td   valign="bottom"> 
			 		<input type="text" class ="inputA" name="ccbh" id="ccbh" readonly/>
			 	</td>
			 </tr>
		 	</table>
		 	
		 	<table width="90%" >
				<tr height="40">
					<td width="10%" align="left">
						<p class="bq">&nbsp;&nbsp;司磅员:</p>
					</td>
					<td width="20%"  valign="bottom">
						<input type="text" class="inputA"  name="kpy"  value='<s:property value="kpy"/>' readonly/>
					</td>
					
					<td  width="10%">
						<p class="bq">发货员:</p>
					</td>
					<td width="20%"  valign="bottom">
						<input type="text"  class="inputA" name="fhy" readonly />
					</td>
					
					<td width="15%" align="left">
						<p class="bq">客户签收:</p>
					</td>
					<td width="25%"  valign="bottom" >
						<input type="text"  class="inputA"  name="khqs" readonly />
					</td>
				</tr>
			</table>
			
	</div>	
	</form>
	
	</body>
</html>