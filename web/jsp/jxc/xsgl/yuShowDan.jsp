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

	<script type="text/javascript" src="jsp/jxc/xsgl/yuShowDan.js"></script>
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
}
.gjz {
	color: #FF0000;
	font-size: 12px;
}

</style>
	
	<title>预售单</title>
	</head>
	<body>
	<form>
	<div id="toolbar" style="width: 100%"></div>
	<br>
			<p class="dbt">
					楚城水泥客户订货单
			</p>
		<div id="maindiv" style="width: 100%"  align="center">
		<br>
		
		<table width="90%" height="25" border="0" align="center"
						background="images/tz.gif" cellpadding="0" cellspacing="0">
						<tr>
							<td width="6%" align="center">
								&gt;&gt;
							</td>
							<td width="94%" align="left">
								订货单
							</td>
						</tr>
					</table>
				<br>
					
		 			<table width="90%" >
							<tr height="40">
								<td width="15%" align="left">
									<p class="bq">&nbsp;&nbsp;&nbsp;&nbsp;日期:</p>
								</td>
								<td width="35%" valign="center">
									<input type="text" class="inputA" name="kpsj" id="kpsj" value='<s:property value="kpsj"/>'   style="text-align:left"  />
								</td>
								
								<td  width="15%">
									<p class="bq">单号:</p>
								</td>
								<td width="35%" valign="bottom">
									<input type="text"  class="inputA" name="jhdh"  id ="jhdh" style="text-align:left" readonly/>
								</td>
							</tr>
						</table>
						
						
		 	<table id="tab1"  width="90%" border="1" align="center"
						cellpadding="0" bordercolor="#139AD2" cellspacing="0"
						style="border-collapse: collapse">
			 <tr height="40">
			 
			 	<td width="20%" align="center"><p class="bq">客户名称</p></td>
			    <td width="20%" colspan="4" valign="center"> 
			        
			        <div style='float:left'><input  type="text" id="khmc" name="khmc" size="30" /></div>
			 		
			 	</td>

			 	
			 </tr>

			 <tr height="40">
			 	<td  align="center">
			 		<p class="bq">品种规格</p>
			 	</td>
			 	<!--  <td  align="center">
			 		<p class="bq">转入数量(吨)</p>
			 	</td>-->
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
			  
			 <tr height="40">
			 	<td width="20%" valign="center"> 
			 		<input  type="text" class ="inputA" id="pzgg" name="pzgg"  />
			 	</td>
			 	<!--  <td width="15%" valign="center"> 
			 		<input  type="text" class ="inputA" id="zrsl" name="zrsl"   />
			 	</td>-->
			    <td width="20%" valign="center"> 
			 		<input  type="text" class ="inputA" id="sl" name="sl"  onChange="jsje1(this)" />
			 	</td>
			 	<td width="20%" valign="center"> 
			 		<input  type="text" class ="inputA" id="dj" name="dj"  onChange="jsje2(this)"/>
			 	</td>
			 	<td width="20%" valign="center"> 
			 		<input  type="text" class ="inputA" id="je" name="je" readonly />
			 	</td>
			 	<td width="20%" valign="center"> 
			 		<input  type="text" class ="inputA" id="bz" name="bz"  />
			 	</td>
			 </tr>	
			  <tr height="40">
			 	<td  align="center">
			 		<p class="bq">大写金额</p>
			 	</td>
			    <td  valign="center" colspan = "4"> 
			 		<input  type="text" class ="inputA"  id="dxje" name="dxje" readonly  />
			 	</td>
			 </tr>		 
			 
			  <tr height="40">
			 	<td  width="100%" colspan="8">
			 		<p class="bq">&nbsp;&nbsp;&nbsp;&nbsp;备注:&nbsp;&nbsp;&nbsp;&nbsp;
			 			本订货单仅为订货依据，与实际销售、发货无关。
			 		</p>
			 	</td>
			 </tr>
		 	</table>
		 	
		 	<table width="90%" >
				<tr height="40">
					<td width="10%" align="left">
						<p class="bq">&nbsp;&nbsp;开票员:</p>
					</td>
					<td width="20%"  valign="bottom">
						<input type="text" class="inputA"  name="kpy" id="kpy" value='<s:property value="kpy"/>' readonly/>
					</td>
					
			
					
					<td width="15%" align="left">
						<p class="bq">单位盖章:</p>
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