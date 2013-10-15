

function getImage(obj)
{
	obj.src ="authImg";
}

function userLogin()
{
	
	 Ext.MessageBox.wait('登陆中！！！','请稍后。。。。。。');
	
	if(checkedIsNotNull())
	{
		var user = Ext.get("TxtUserName").dom.value;
		var pass = Ext.get("TxtPassword").dom.value;
		var vercode = Ext.get("TxtVercode").dom.value;
			
		Ext.Ajax.request
		 ({    
	 		url:'Login.action', 
	   		params:{user:user,pass:pass,vercode:vercode}, 
	   		method:'POST',
	   		success: function(resp,opts) 
	        { 
	        	 var result = Ext.decode(resp.responseText);
	        	 
	        	  Ext.Msg.alert('信息',result.message);
	        	 
	        	 if(true == result.success)
	        	 {
	        	 	Ext.MessageBox.hide();
	        	 	
	        	 	var   WinHeight; 
					var   WinWidth; 
					WinHeight=screen.availHeight; 
					WinHeight=WinHeight-28; 
					WinWidth=screen.availWidth; 
					WinWidth=WinWidth-10; 
					
					var path ="minjsp!initPage.action"; 
					//alert(WinHeight);
					//alert(WinWidth);
					var url="minjsp!initPage.action";
					//关闭父窗口
					window.opener=null 
					window.close() 
					
					//window.open(url,"big",'fullscreen=yes');
					
					window.open(url,"",'height='+WinHeight+',width='+WinWidth+',top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no,'+
					+'titlebar=no')
	        	 }
	           
	        },
	        failure:function()
	 		{
	 			Ext.Msg.alert('错误','操作失败');
	 		}
	   });	
	}
	
	
}

function logout(){
	var url="Login!logout.action";
					//关闭父窗口
	//window.opener=null;
	window.parent.close();
	window.open(url)
	//document.location="default.html";
	
	
}

function checkedIsNotNull()
{
	if(Ext.get("TxtUserName").dom.value == "")
	{
		Ext.Msg.getDialog().setWidth(500);  
		Ext.Msg.alert('错误','用户名不能为空！！');
		return false;
	}
	if(Ext.get("TxtPassword").dom.value == "")
	{
		Ext.Msg.alert('错误','密码不能为空！！');
		return false;
	}
	if(Ext.get("TxtVercode").dom.value == "")
	{
		Ext.Msg.alert('错误','验证码不能为空！！');
		return false;
	}
	return true;
}