
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%> 
<html> 
<head> 
 <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
 <meta http-equiv="Expires" content="0" />
 <meta http-equiv="kiben"  content="no-catch"/>
  <link rel="stylesheet" type="text/css"  href="extjs/resources/css/ext-all.css"></link>
  <script type="text/javascript"	src="extjs/ext-base.js"></script>
  <script type="text/javascript" src="extjs/ext-all-debug.js"></script>
  <script type="text/javascript" src="extjs/ext-lang-zh_CN.js"></script>
  <script type="text/javascript" src="jsp/jxc/xtgl/userInfo.js"></script> 
  
 
<title>密码设置</title> 
</head> 
    <body>
        <div id="main">
             <div id="head" style="font-weight:bold;font-size:200%;"></div>
             
        </div>
        <input id="uid" name="uid" type="hidden" value="<%=session.getAttribute("user")%>"/>
    </body> 
</html> 
