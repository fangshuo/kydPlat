<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%> 
<html> 
<head> 
 <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
 <link rel="stylesheet" type="text/css"  href="extjs/resources/css/ext-all.css"></link>
  <script type="text/javascript" src="extjs/adapter/ext/ext-base.js"></script>
 <script type="text/javascript" src="extjs/ext-all-debug.js"></script>
 <script type="text/javascript" src="extjs/ext-all.js"></script> 
 <script type="text/javascript" src="extjs/ext-lang-zh_CN.js"></script>
 
 <script type="text/javascript"	src="javascript/LeftMenu.js"></script>
		<script type="text/javascript"	src="javascript/MainPanel.js"></script>
		<script type="text/javascript"	src="javascript/Main.js"></script>
		<script type="text/javascript"	src="javascript/Menu.js"></script>
		<script type="text/javascript"	src="javascript/ToolBar.js"></script>
		<title>快易贷管理系统</title>


</head>

	<body>
		<div id='deskTree'></div>
		<div id='mainTree' ></div>
		<div id='sysTree' ></div>
		<input id="uid" name="uid" type="hidden" value="<%=session.getAttribute("user")%>"/>
		<input id="xttime" name="xttime" type="hidden" value="<%=session.getAttribute("xttime")%>"/>
	</body>
</html> 