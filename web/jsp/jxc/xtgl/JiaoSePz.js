var jsid = "";
var menuid = "";

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
		loader : new Ext.tree.TreeLoader({dataUrl : 'getJiaoSeTree!getJiaoSeTree.action?treeClick=true&id=JXDM_00000'}),
		containerScroll : true,
		root:jiaose
		
	});
	
	
		var xtmenu = new Ext.tree.AsyncTreeNode
		({
			text:'系统菜单',
			id:'0',
			draggable : false,
			singleClickExpand : true,
			//是否展开子节点
			expanded : true
		});

      var menuPanl = new Ext.tree.TreePanel({
      	// 是否显示root
      	id:'xtmenu',
      	baseCls:"x-plain,y-plain",
      	rootVisible : true,
      	//滚动条
		autoScroll : true,
		enableDD : false,
		//角色表，角色id，上级角色id ，角色名称，选用标记
		loader : new Ext.tree.TreeLoader({dataUrl : 'getMenuTree!getMenuTree.action?treeClick=true&id=0'}),
		containerScroll : true,
		root:xtmenu
		
	});
	
	
	jiaosePanl.on('beforeload',treeBeforeload,this);  
	menuPanl.on('beforeload',treeBeforeload2,this)
	
	function treeBeforeload(node) 
	 {
	   		if (!node.isExpanded()) 
	   	 	{
				var tree = Ext.getCmp('jiaosePanl');
				var treeid = node.id;
				var url = 'getJiaoSeTree!getJiaoSeTree.action?treeClick=true&id='+treeid;
				tree.loader.dataUrl = url;
		    }	    
	 }
	
	 function treeBeforeload2(node) 
	 {
	 	 Ext.getCmp("jiaosePanl").root.cascade(function(node){   
			if(node.ui.isChecked()== true)
			{
				jsid += node.id;
			}
		
		});
	
		var tree = Ext.getCmp('xtmenu');
		var treeid = node.id;
		var url = 'getMenuTree!getMenuTree.action?treeClick=true&id='+treeid+'&jsid='+jsid;
		tree.loader.dataUrl = url;
		
		jsid = "";
	 }
	

	//角色菜单单选。选中后改变样式
	 jiaosePanl.on('checkchange',changeYs,this);  
	 menuPanl.on('checkchange',changeYs2,this)
	 
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
			
			//回显数据
			var pNode = node.parentNode;
			Ext.getCmp('sjjsdm').setValue(pNode.id);
	 		Ext.getCmp('sjjsmc').setValue(pNode.text);
	 		Ext.getCmp('jsdm').setValue(node.id);
	 		Ext.getCmp('jsmc').setValue(node.text);
	 		Ext.getCmp('jslxradio').setValue('1');
	 		
	 		
	 		Ext.getCmp('jsdm').removeClass('noReadOnly');
	 		Ext.getCmp('jsdm').addClass('readOnly');
	 		
	 		Ext.getCmp('sjjsdm').removeClass('noReadOnly');
	 		Ext.getCmp('sjjsdm').addClass('readOnly');
	 		
	 		Ext.getCmp('sjjsmc').removeClass('noReadOnly');
	 		Ext.getCmp('sjjsmc').addClass('readOnly');
	 		
	 		///叶子节点可以修改删除，不可以新增
	 		Ext.getCmp('new').setDisabled(true);
	 		Ext.getCmp('change').setDisabled(false);
	 		Ext.getCmp('delete').setDisabled(false);
			
			//加载菜单树
			Ext.getCmp("xtmenu").root.reload();

		}else
		{
			obj = null;
			ui.removeClass("big");
		}

	 }
	 
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
		title:'角色菜单配置',
		region: 'center',
		autoScroll : true,
		height:200,
		//frame:true,
		layout:'form',
		items:[tb,
		{layout:'column',
		 items:[{columnWidth:.5,baseCls:"x-plain,y-plain",items:jiaosePanl},
		 	    {columnWidth:.5,baseCls:"x-plain,y-plain",items:menuPanl}]
		}]
	});
	
	
	
	    // form start
    var form = new Ext.form.FormPanel({
        title: '角色新增',
        id : 'form',
        region: 'east',
        frame: true,
        buttonAlign:'center',
        width: 300,
        autoHeight: true,
        labelAlign: 'right',
        labelWidth: 90,
        defaultType: 'textfield',
        defaults: {
            width: 170
        },
        items: [{
            fieldLabel: '上级角色代码',
            id:'sjjsdm',
            name: 'sjjsdm'
        }
        ,{
            fieldLabel: '上级角色名称',
            id: 'sjjsmc',
            name: 'sjjsmc'
        },
        {
           xtype:'hidden',name: 'jsdm',id:'jsdm'
        },{
            fieldLabel: '角色名称',
            id:'jsmc',
            name: 'jsmc'
        },
        {
        	fieldLabel: '节点类型',
        	name:'jslxradio',   
   			id:'jslxradio', 
        	xtype: 'radiogroup',
        	items:[{
                boxLabel:'非叶子节点',inputValue:'0',name:'jslx'
                },{
                boxLabel:'叶子节点',inputValue:'1',name:'jslx' ,checked:true}]
        }],
         buttons: [
         	{
            	text: '新增',
            	id:'new',
            	width:55, 
            	handler: function()
            			{
	 						saveData();
	 					},
            	scope : this
        	},
         	{
            	text: '修改',
            	id:'change',
            	width:55, 
            	handler: function()
            		{
            			changeData();
            		}
        	},
       	  	{
            	text: '删除',
            	id:'delete',
            	width:55, 
            	handler: function()
            		{
            			delData();
            		}
        	}
        	
        		]
    });
    // form end
    
     jiaosePanl.on('click',showMessage,this);  
	 
	 
    

     // layout start
    var viewport = new Ext.Viewport({
        layout: 'border',
        baseCls:"x-plain,y-plain",
        items: [
			{
				region: 'north',
				contentEl: 'jiaosePanl'
			},
			panl, 
			form]
    });
 
})


	/*点击菜单在面板中显示该节点的信息
	 * */
	function showMessage(node)
	 {
	 	
	 	var pNode = node.parentNode;
	 	//如果是文件夹节点，则可以新增
	 	if(node.leaf == false)
	 	{	//并且不是系统角色才可新增加
	 		//alert("不是叶子");
	 		if(node!=Ext.getCmp('jiaosePanl').getRootNode())
	 		{
	 			//alert("不是主节点");
	 			Ext.getCmp('sjjsdm').setValue(node.id);
	 			Ext.getCmp('sjjsmc').setValue(node.text);
	 			Ext.getCmp('jslxradio').setValue('0');
	 			
	 			Ext.getCmp('jsdm').reset();
	 		    Ext.getCmp('jsmc').reset();
	 		    
	 		    // setDisabled(true)是表单的值不提交,可以getValue()
	 		    //Ext.getCmp('sjjsdm').setDisabled(true);
	 			
	 		    Ext.getCmp('sjjsdm').removeClass('noReadOnly');
	 			Ext.getCmp('sjjsdm').addClass('readOnly');
	 			
	 			
	 			Ext.getCmp('sjjsmc').removeClass('readOnly');
	 			Ext.getCmp('sjjsmc').addClass('noReadOnly');
	 			
	 			Ext.getCmp('jsdm').removeClass('readOnly');
	 			Ext.getCmp('jsdm').addClass('noReadOnly');
	 			
	 			
	 			//普通非叶子节点，可以新增，可以修改，
	 			Ext.getCmp('new').setDisabled(false);
	 			Ext.getCmp('change').setDisabled(false);
	 			Ext.getCmp('delete').setDisabled(false);
	 			
	 			
	 		}else
	 		{
	 			//alert("主节点");
	 			Ext.getCmp('sjjsdm').setValue(node.id);
	 			Ext.getCmp('sjjsmc').setValue(node.text);
	 			Ext.getCmp('jslxradio').setValue('0');
	 			
	 			Ext.getCmp('jsdm').reset();
	 		    Ext.getCmp('jsmc').reset();
	 			
	 		    Ext.getCmp('sjjsdm').removeClass('noReadOnly');
	 			Ext.getCmp('sjjsdm').addClass('readOnly');
	 			
	 			Ext.getCmp('sjjsmc').removeClass('noReadOnly');
	 			Ext.getCmp('sjjsmc').addClass('readOnly');
	 			
	 			Ext.getCmp('jsdm').removeClass('readOnly');
	 			Ext.getCmp('jsdm').addClass('noReadOnly');
	 		
	 			
	 			// 主节点可以新增，不可以修改删除
	 			Ext.getCmp('new').setDisabled(false);
	 			Ext.getCmp('change').setDisabled(true);
	 			Ext.getCmp('delete').setDisabled(true);
	 		}
	 	}else 
	 	{
	 		//alert("叶子节点");
	 		//alert(Ext.getCmp('new').disabled);
	 		//如果是叶子节点，则可以修改
	 		Ext.getCmp('sjjsdm').setValue(pNode.id);
	 		Ext.getCmp('sjjsmc').setValue(pNode.text);
	 		Ext.getCmp('jsdm').setValue(node.id);
	 		Ext.getCmp('jsmc').setValue(node.text);
	 		Ext.getCmp('jslxradio').setValue('1');
	 		
	 		
	 		Ext.getCmp('jsdm').removeClass('noReadOnly');
	 		Ext.getCmp('jsdm').addClass('readOnly');
	 		
	 		Ext.getCmp('sjjsdm').removeClass('noReadOnly');
	 		Ext.getCmp('sjjsdm').addClass('readOnly');
	 		
	 		Ext.getCmp('sjjsmc').removeClass('noReadOnly');
	 		Ext.getCmp('sjjsmc').addClass('readOnly');
	 		
	 		///叶子节点可以修改删除，不可以新增
	 		Ext.getCmp('new').setDisabled(true);
	 		Ext.getCmp('change').setDisabled(false);
	 		Ext.getCmp('delete').setDisabled(false);
	 	}
	 	
	 }
	 
	 // submit 提交必须返回sucess：true是才执行success方法
	 // ajax 是只要响应成功就执行sucess
	 // 新增
	 function saveData()
	 {
	 	if(true == beforeSaveData())
	 	{	
	 		// 添加
            Ext.getCmp('form').getForm().submit
	 		({
	 				url: 'JiaoSePz!savaOrDele.action',
	 				params:{handleCode:'saveData'},
	 				success:function(form,action)
	 				{
	 					Ext.Msg.alert('信息!!!',action.result.msg);
	 					Ext.getCmp("jiaosePanl").root.reload();
	 					//重新加载
	 					//menuTreePanel.root.reload();
	 				},
	 				failure:function()
	 				{
	 					Ext.Msg.alert('错误!!!','数据保存出错!!!!!');
	 				}
	 		});
	 	  }
	 	}
	 	
	 	
	function beforeSaveData()
	 {
	 	if(Ext.getCmp('sjjsmc').getValue()=='')
	 	{
	 		Ext.Msg.alert('错误!!!','上级角色名称不能为空!');
	 		return false;
	 	}
	 	if(Ext.getCmp('jsmc').getValue()=='')
	 	{
	 		Ext.Msg.alert('错误!!!','角色名称不能为空!');
	 		return false;
	 	}
	 	return true;
	 }	
	 
	 
 //删除数据
	 function delData()
	 {
	 	var url = 'JiaoSePz!savaOrDele.action';
	 	var jsdm ;
	 	var params;
	 	var xsxx;
	 	//根据 新增按钮是否可用，可用的话不是叶子节点，不可用说明是叶子节点
	 
	 	if(Ext.getCmp('new').disabled == false)
	 	{
	 		jsdm = Ext.getCmp('sjjsdm').getValue();
	 		params = 'jsdm='+jsdm+'&handleCode=delData&leaf=0';
	 		xsxx =  "该节点不是叶子节点，删除后子节点也将被删除???"
	 		
	 	}else
	 	{
	 		jsdm = Ext.getCmp('jsdm').getValue();
	 		//alert(jsdm)
	 		params = 'jsdm='+jsdm+'&handleCode=delData&leaf=1';
	 		xsxx =  "确定删除该角色???"
	 	}
	 	
		Ext.MessageBox.confirm("请确认!!!!!!", xsxx ,function(button)
		{
			if(button=="yes")
			{	
				 ajax(url,params);
			}
		});
	 }
	 
	 
	 /**
	  * 修改
	  */
	 function changeData()
	 {
	 	
	 	if(true == beforeChangeData())
	 	{
	 		
	 		var jsdm ;
		 	var jsmc;
		 	var jslx;
		 	var url = 'JiaoSePz!savaOrDele.action';
		 	var params ;
		 	
		 	// 节点类型为文件夹程序判断不可以将非叶子节点改为叶子节点，所以leaf = 0
		 	if(Ext.getCmp('new').disabled == false)
	        {
	               jsdm = Ext.getCmp('sjjsdm').getValue();
	               jsmc = Ext.getCmp('sjjsmc').getValue();
	                         
	               params = 'handleCode=changeData&jsdm='+jsdm+'&jsmc='+jsmc+'&leaf=0';
	                         
	               if(Ext.getCmp('form').getForm().getValues()["jslx"]!='0')
	               {
	                                 // 如果可以改的话，子节点怎么办，删除太麻烦
	                   Ext.Msg.alert('信息','不能将非叶子节点改为叶子节点!!!');
	               }else
	               {
	                    ajax(url,params);
	               }
	                         
	         }else
	         {
         		 jslx = Ext.getCmp('form').getForm().getValues()["jslx"];
                 jsdm = Ext.getCmp('jsdm').getValue();
                // alert(jsdm);
                 jsmc = Ext.getCmp('jsmc').getValue();
                 params = 'handleCode=changeData&jsdm='+jsdm+'&jsmc='+jsmc+'&leaf='+jslx;
                 ajax(url,params);
	          }
	 	}
	 	
	 }
	 
	  function ajax(url,params)
	 {
	 	Ext.Ajax.request
		({    
     		url: url, 
       		params: params, 
       		method:'POST',
     		//options : Object 请求所调用的参数。
       		success: function(resp,opts) 
            { 
             	var result = Ext.decode(resp.responseText);
               //msg 是从后台返回的如果程序出错执行不到这一步，msg为空
	            Ext.Msg.alert('信息',result.msg);
	            
	            Ext.getCmp("jiaosePanl").root.reload();
	            Ext.getCmp("xtmenu").root.reload();
	            Ext.getCmp("form").getForm().reset();
            },
            failure:function()
	 		{
				Ext.Msg.alert('错误','操作失败!!');
			}
       	});	  
	 }
	 
	 
	  // 提交角色与菜单的关联关系
	function submitData()
	{
		Ext.getCmp("jiaosePanl").root.cascade(function(node){   
			if(node.ui.isChecked()== true)
			{
				jsid += node.id;
			}
		});
		
		if(jsid == "")
		{
			 Ext.Msg.alert('错误','请选择要关联的角色！！');
			return
		}
		
		 Ext.getCmp("xtmenu").root.cascade(function(node){   
			if(node.ui.isChecked()== true)
			{
				menuid += node.id+",";
			}
			
		});
		
		if(menuid == "")
		{
			 Ext.Msg.alert('错误','请选择角色对应的菜单！！');
			return
		}
		
		Ext.Ajax.request
		 ({    
     		url:'JiaoSePz!submitData.action', 
       		params:'menuid='+menuid+'&jsid='+jsid, 
       		method:'POST',
       		//options : Object 请求所调用的参数。
       		success: function(resp,opts) 
            { 
                var result = Ext.decode(resp.responseText);
	            Ext.Msg.alert('信息',result.msg);
	            Ext.getCmp("jiaosePanl").root.reload();
	            Ext.getCmp("xtmenu").root.reload();
            },
            failure:function()
	 		{
	 			Ext.Msg.alert('错误','操作失败');
	 		}
       });	
       
       /*数据提交后将原始数据全部置为初始化*/
	    menuid = "";
	    jsid ="";
	}
	
	 
	 /**
	  *  保存前校验数据非空
	  * @return {Boolean}
	  */
	 function beforeChangeData()
	 {
	 	if(Ext.getCmp('new').disabled == false)
	 	{
	 		if(Ext.getCmp('sjjsmc').getValue()=='')
	 		{
	 			Ext.Msg.alert('错误!!!','上级角色名称不能为空!');
	 			return false;
	 		}
	 	}else
	 	{
	 		if(Ext.getCmp('jsmc').getValue()=='')
	 		{
	 			Ext.Msg.alert('错误!!!','角色名称不能为空!');
	 			return false;
	 		}
	 	}
	 	
	 	return true;
	 }
	 
