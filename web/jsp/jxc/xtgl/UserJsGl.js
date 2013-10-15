var jsid = "";
var userid = "";

Ext.onReady(function(){
	//菜单树必须有，否则找不到图片出现小格子
 	Ext.BLANK_IMAGE_URL = 'pic/s.gif';
	Ext.QuickTips.init();
	Ext.lib.Ajax.defaultPostHeader += ";charset=utf-8";

	
	
 		var jiaose = new Ext.tree.AsyncTreeNode
		({
			text:'系统角色',
			id:'JXDM_00000',
			leaf:false,
			draggable : false,
			singleClickExpand : true,
			//是否展开子节点
			expanded : true
		});

 
	
      var jiaosePanl = new Ext.tree.TreePanel({
      	// 是否显示root
      	id:'jiaosePanl',
      	baseCls:"x-plain,y-plain",
      	rootVisible : true,
		autoScroll : true,
		enableDD : false,
		//角色表，角色id，上级角色id ，角色名称，选用标记
		loader : new Ext.tree.TreeLoader({dataUrl : 'getUserJiaoSeTree!getJiaoSeTree.action?treeClick=true&id=JXDM_00000&userid='+userid}),
		containerScroll : true,
		root:jiaose
		
	});
	
	
		var userTree = new Ext.tree.AsyncTreeNode
		({
			text:'系统用户',
			id:'0',
			draggable : false,
			singleClickExpand : true,
			//是否展开子节点
			expanded : true
		});

      var userPanl = new Ext.tree.TreePanel({
      	// 是否显示root
      	id:'userpanl',
      	baseCls:"x-plain,y-plain",
      	rootVisible : true,
      	//滚动条
		autoScroll : true,
		enableDD : false,
		//角色表，角色id，上级角色id ，角色名称，选用标记
		loader : new Ext.tree.TreeLoader({dataUrl : 'getUserTree!getUserTree.action?treeClick=true&id=0'}),
		containerScroll : true,
		root:userTree
		
	});
	
	
	jiaosePanl.on('beforeload',treeBeforeload,this);  
	//userPanl.on('beforeload',treeBeforeload2,this)
	
	function treeBeforeload(node) 
	 {
 		 Ext.getCmp("userpanl").root.cascade(function(node){   
			if(node.ui.isChecked()== true)
			{
				userid += node.id;
			}
		
		});
	 	
		var tree = Ext.getCmp('jiaosePanl');
		var treeid = node.id;
		var url = 'getUserJiaoSeTree!getJiaoSeTree.action?treeClick=true&id=' + treeid+'&userid='+userid;
		tree.loader.dataUrl = url;
		
		userid =""; 
 
	 }
	
	/* function treeBeforeload2(node) 
	 {
	   	if (!node.isExpanded()) 
	   	 {
				var tree = Ext.getCmp('userpanl');
				var treeid = node.id;
				var url = 'getMenuTree!getMenuTree.action?treeClick=true&id=' + treeid;
				tree.loader.dataUrl = url;
		 }	    
	 }*/
	

	//角色菜单单选。选中后改变样式
	 userPanl.on('checkchange',changeYs,this)
	 jiaosePanl.on('checkchange',changeYs2,this);  
	 

	 function changeYs2(node,checked)
	 {
	 	var ui= node.ui;
		if(checked==true)
		{
			ui.addClass("big");
		}
		if(checked== false)
		{
			ui.removeClass("big");
		}
	 }
	 
	 
	 /**
	  * 
	  *  function changeYs2(node,checked)
	 {
	 	var id = "";
	 	var ui= node.ui;
		if(checked==true)
		{
			jsid += node.id+",";
			ui.addClass("big");
		}
		if(checked== false)
		{
			var array = jsid.split(",");
			for(var i=0;i<array.length-1;i++)
			{
				if(array[i]== node.id)
				{
					//两个参数，从第几个去掉几个
					array.splice(i,1);
				}
			}
			jsid = array.toString();
			ui.removeClass("big");
			
		}
	 }
	  */
	 
	 
	 var obj = null;
	 function changeYs(node,checked)
	 {
	 	
	 	var ui= node.ui;
		//如果选框是被勾上
		if(checked==true)
		{
			
			//判断是否是存在其他被选的
			if(obj == null)
			{
				//不存在备选的则为第一个被选上的，赋值，字体变大
				ui.addClass("big");
				obj=node;
			}else
			{
				// 移除之前的字体以及将a重新赋值
				obj.ui.removeClass("big");
				obj.ui.toggleCheck();
				
				ui.addClass("big");
				obj = node;
			}
			Ext.getCmp("jiaosePanl").root.reload();

		}else
		{
			obj = null;
			ui.removeClass("big");
		}

	 }
	 
	
	 
	 
	 
	var tb = new Ext.Toolbar({
					baseCls:"x-plain,y-plain",
					items : [{
								text : "提交",
								iconCls : "sumbit",
								id : "submit",
								handler : function() {
									submitData();
								},
								scope : this
							}]
				});	 
	 
		
	var panl = new Ext.Panel({
		region: 'center',
		autoScroll : true,
		height:200,
		//frame:true,
		layout:'form',
		items:[tb,
		{layout:'column',
		 items:[{columnWidth:.5,baseCls:"x-plain,y-plain",items:userPanl},
		 	    {columnWidth:.5,baseCls:"x-plain,y-plain",items:jiaosePanl}]
		}]
	});
	
	 
	 
    

     // layout start
    var viewport = new Ext.Viewport({
        layout: 'border',
        baseCls:"x-plain,y-plain",
        items: [
			{
				region: 'north',
				contentEl: 'main'
			},
			panl]
    });
 
})


 
	 // 提交角色与菜单的关联关系
	function submitData()
	{
		 Ext.getCmp("userpanl").root.cascade(function(node){   
			if(node.ui.isChecked()== true)
			{
				userid += node.id;
			}
			
		});
		
		if(userid == "")
		{
			 Ext.Msg.alert('错误','请选择要关联的用户！！');
			return
		}
		
		 Ext.getCmp("jiaosePanl").root.cascade(function(node){   
			if(node.ui.isChecked()== true)
			{
				jsid += node.id+",";
			}
			
		});
		
		if(jsid == "")
		{
			 Ext.Msg.alert('错误','请选择角色对应的菜单！！');
			return
		}
		
		Ext.Ajax.request
		 ({    
     		url:'UserJsGl!submitData.action', 
       		params:'userid='+userid+'&jsid='+jsid, 
       		method:'POST',
       		//options : Object 请求所调用的参数。
       		success: function(resp,opts) 
            { 
                var result = Ext.decode(resp.responseText);
	            Ext.Msg.alert('信息',result.msg);
	           
	    		// 先刷新用户菜单
	    		Ext.getCmp("userpanl").root.reload();
	            Ext.getCmp("jiaosePanl").root.reload();
	          
            },
            failure:function()
	 		{
	 			Ext.Msg.alert('错误','操作失败');
	 		}
       });
       
        /*数据提交后将原始数据全部置为初始化*/
	    		userid = "";
	    		jsid ="";
       
      
	}