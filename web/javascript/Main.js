Ext.onReady(function() {

	Ext.BLANK_IMAGE_URL = 'pic/s.gif';
	Ext.QuickTips.init();
	Ext.lib.Ajax.defaultPostHeader += ";charset=utf-8";
	
	
	
	  // open新页面可以抽出放在公共js中
    function openMaxWindow(url) {
	var winheight = screen.availHeight - 55;
	var winwidth = screen.availWidth - 10;
	var param = "height="
			+ winheight
			+ ",width="
			+ winwidth
			+ ",top=0,left=0,toolbar=no,menubar=no,scrollbars=yes,resizable=no,location=no,status=no,titlebar=no";
	window.open(url, "", param);
      }
      
      // 弹出小窗口，将小窗口至于mainTab 中
function addTab(id, title, url, flag) {
	var n = mainTab.getComponent(id);
	if (!n) {
		var n = mainTab.add({
					'id' : id,
					'title' : title,
					closable : flag,
					html : '<iframe scrolling="auto" name="'
							+ id
							+ 'fr" frameborder="0" width="100%" height="100%" src="'
							+ url + '"></iframe>'
				});
	}
	mainTab.setActiveTab(n);
}

	// 1、创建head部分

	
		var head = new Ext.Panel( {
			region : 'north',
			border : false,
			//html : '<div style="background:url(pic/main1.gif) repeat-x; height:78px;"></div>',
			height : 78
		});
		
	

		// 2、创建foot部分
        var uid = Ext.get("uid").dom.value;
		var xttime = Ext.get("xttime").dom.value;
		//alert(xttime);
		// 2、创建foot部分
		var foot = new Ext.Panel( {
			region : 'south',
			html : '<div style="background:url(pic/main2.gif) repeat-x; height:33px; ">'
					+ '<div style="float:left;font:normal 12px tahoma, arial, sans-serif, 宋体;margin:10px 0 0 10px;width:650px;">'
					+ '<span style="color:blue;font-weight:600;">登录人：</span><span style="color:red">'+uid+'</span>'
					+'&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:blue;font-weight:600;">登陆时间：</span><span style="color:red">'+xttime+'</span>'
					+'</div>',
			height : 35
		});


        // 创建 01日志管理菜单
        var rootRZGL = new Ext.tree.AsyncTreeNode( {
						   id  : '1000',
			               text : "基本信息",
			               draggable : false,
					       singleClickExpand : true,
					       expanded : true  });
					       
		var rzglPanel = new Ext.tree.TreePanel( {
			id : 'rzglTree',
			rootVisible : false,
			autoScroll : true,
			enableDD : false,
			loader : new Ext.tree.TreeLoader({dataUrl : 'getTree.action?treeClick=true&id=1000'}),
			containerScroll : true,
			root : rootRZGL
		});
		
		 // 给菜单添加事件以及方法
		rzglPanel.on('beforeload', treeBeforeload ,this);     
	    rzglPanel.on('click', treeClick, this);
	    
	    
	    // 创建 02模型管理菜单
        var rootMXGL = new Ext.tree.AsyncTreeNode( {
						   id  : '2000',
			               text : "销售管理",
			               draggable : false,
					       singleClickExpand : true,
					       expanded : true  });
					       
		var mxglPanel = new Ext.tree.TreePanel( {
			id : 'mxglTree',
			rootVisible : false,
			autoScroll : true,
			enableDD : false,
			loader : new Ext.tree.TreeLoader({dataUrl : 'getTree.action?treeClick=true&id=2000'}),
			containerScroll : true,
			root : rootMXGL
		});
		
		 // 给菜单添加事件以及方法
		mxglPanel.on('beforeload', treeBeforeload2,this);     
	    mxglPanel.on('click', treeClick, this);


	    // 创建 03预警管理菜单
        var rootYJGL = new Ext.tree.AsyncTreeNode( {
						   id  : '3000',
			               text : "查询管理",
			               draggable : false,
					       singleClickExpand : true,
					       expanded : true  });
					       
		var yjglPanel = new Ext.tree.TreePanel( {
			id : 'yjglTree',
			rootVisible : false,
			autoScroll : true,
			enableDD : false,
			loader : new Ext.tree.TreeLoader({dataUrl : 'getTree.action?treeClick=true&id=3000'}),
			containerScroll : true,
			root : rootYJGL
		});
		
		 // 给菜单添加事件以及方法
		yjglPanel.on('beforeload', treeBeforeload3,this);     
	    yjglPanel.on('click', treeClick, this);

	    	    
	    // 创建 05系统管理菜单
        var rootXTGL = new Ext.tree.AsyncTreeNode( {
						   id  : '9000',
			               text : "系统管理",
			               draggable : false,
					       singleClickExpand : true,
					       expanded : true  });
					       
		var xtglPanel = new Ext.tree.TreePanel( {
			id : 'xtglTree',
			rootVisible : false,
			autoScroll : true,
			enableDD : false,
			loader : new Ext.tree.TreeLoader({dataUrl : 'getTree.action?treeClick=true&id=9000'}),
			containerScroll : true,
			root : rootXTGL
		});
		
		 // 给菜单添加事件以及方法
		xtglPanel.on('beforeload', treeBeforeload5,this);     
	    xtglPanel.on('click', treeClick, this);

		function treeClick(node,e)
	    {
	    	if (node.isLeaf()) 
	    	{
			  	 e.stopEvent();
			 //如果标记是1重新打开一个widow窗口
				if (node.attributes.openFlag == "1") {
					openMaxWindow(node.attributes.href);
				} else 
				{
					if (node.attributes.isClose == "0") 
					{
						addTab(node.attributes.id, node.attributes.text,
							node.attributes.href , false);
					} else 
					{
						addTab(node.attributes.id, node.attributes.text,
							node.attributes.href, true);
					}
				}
			}
	    }

	    function treeBeforeload(node) 
	   	{
	   		if (!node.isExpanded()) 
	   	 	{
				var tree = Ext.getCmp('rzglTree');
				var treeid = node.id;
				var url = 'getTree.action?treeClick=true&id=' + treeid;
				tree.loader.dataUrl = url;
		    }	    
	   	}
	   	
	   	function treeBeforeload2(node) 
	   	{
	   		if (!node.isExpanded()) 
	   	 	{
				var tree = Ext.getCmp('mxglTree');
				var treeid = node.id;
				var url = 'getTree.action?treeClick=true&id=' + treeid;
				tree.loader.dataUrl = url;
		    }		    
	   	}
	   	
	   	function treeBeforeload3(node) 
	   	{
	   		if (!node.isExpanded()) 
	   	 	{
				var tree = Ext.getCmp('yjglTree');
				var treeid = node.id;
				var url = 'getTree.action?treeClick=true&id=' + treeid;
				tree.loader.dataUrl = url;
		    }		    
	   	}
	   	
	   	function treeBeforeload4(node) 
	   	{
	   		if (!node.isExpanded()) 
	   	 	{
				var tree = Ext.getCmp('bbglTree');
				var treeid = node.id;
				var url = 'getTree.action?treeClick=true&id=' + treeid;
				tree.loader.dataUrl = url;
		    }		    
	   	}
	   	
	   	function treeBeforeload5(node) 
	   	{
	   		if (!node.isExpanded()) 
	   	 	{
				var tree = Ext.getCmp('xtglTree');
				var treeid = node.id;
				var url = 'getTree.action?treeClick=true&id=' + treeid;
				tree.loader.dataUrl = url;
		    }		    
	   	}	   		   		   	
		
		var leftmenu = new Morik.Office.LeftMenu( {
			title : '快易贷管理系统 V1.0',
		    trees : [rzglPanel,mxglPanel,yjglPanel,xtglPanel]
		});

		var mainTab = new Morik.Office.MainingPanel( {
		    id:'mt',
			style : 'padding:0 6px 0 0',
			autoScroll : true,
			region : 'center',
			deferredRender : false,
			activeTab : 0,
			resizeTabs : true,
			inTabWidth : 100,
			tabWidth : 90,
			enableTabScroll : true,
			items : [{
				title : '我的首页',
				html : '<iframe scrolling="auto" name="" frameborder="0" width="100%" height="100%" src="index.html"></iframe>'
			}]
		});

		// 6、创建布局
		var viewport = new Ext.Viewport( {
			layout : 'border',
			style : 'border:#024459 2px solid;',
			items : [head, foot, leftmenu, mainTab]
		});

	});