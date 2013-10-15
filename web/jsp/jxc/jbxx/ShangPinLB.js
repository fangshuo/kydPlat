
Ext.onReady(function(){
 	Ext.BLANK_IMAGE_URL = 'pic/s.gif';
	Ext.QuickTips.init();
	Ext.lib.Ajax.defaultPostHeader += ";charset=utf-8";
	
	var jiaose = new Ext.tree.AsyncTreeNode
		({
			text:'商品类别',
			id:'SPLB000',
			leaf:false,
			draggable : false,
			//singleClickExpand : true,
			//是否展开子节点
			expanded : true
		});

      var shangPinPanl = new Ext.tree.TreePanel({
      	title: '商品类别',
      	id:'shangPinPanl',
      	region: 'east',
        frame: true,
        border:false,
        width: 300,
      	height:550,
      	rootVisible : true,
		autoScroll : true,
		enableDD : false,
		loader : new Ext.tree.TreeLoader({dataUrl : 'getShangPinTree!getTree.action?treeClick=true&id=SPLB000'}),
		containerScroll : true,
		root:jiaose
		
	});
	
	
	shangPinPanl.on('click',showMessage,this);  
	shangPinPanl.on('beforeload',treeBeforeload,this);  
	
	
	
	var fieldset = new Ext.form.FieldSet({
		title:'商品信息',
		labelAlign: 'right',
        labelWidth: 80,
        layout:'column',
        items: [{columnWidth:.5,layout:'form' , defaults: {width: 220,xtype:'textfield'}
        		,items:[{fieldLabel: '上级类别名称',name: 'sjmc',id:'sjmc'},{fieldLabel: '新类别名称',name: 'spmc',id:'spmc'}]},
        		
        		{columnWidth:.5,layout:'form' , defaults: {width: 220}
        	    ,items:[{ fieldLabel: '上级类别编码',xtype:'textfield',name: 'sjbm',id:'sjbm'}
        	    	   ,{columnWidth:.5 ,fieldLabel: '选用标记',name:'xybjradio' ,id:'xybjradio' ,xtype: 'radiogroup',width: 220
		    	    	  	 		 ,items:[{boxLabel:'不选用',inputValue:'0',name:'xybj'},{boxLabel:'选用',inputValue:'1',name:'xybj',checked:true}]}
		    	    	]},
        	  	  
		       {columnWidth:1,layout:'form' ,items:{fieldLabel: '备注',height:40,width:'89%' ,xtype:'textarea',name: 'bz',id:'bz'}}
    		  ]
		});
	
	
	   	

       // form start
    var form = new Ext.form.FormPanel({
       // title: '商品类别信息',
        // baseCls:"x-plain,y-plain",
        id : 'form',
        region: 'east',
        frame: true,
        border:false,
        width:'100%',
        height:550,
       	items:fieldset
    });
    
    
    	
    
    
    var panl = new Ext.Panel({
		//title:'商品信息',
    	baseCls:"x-plain,y-plain",
		layout:'column',
		items:[{columnWidth:.25,baseCls:"x-plain,y-plain",items:shangPinPanl},
			   {columnWidth:.75,baseCls:"x-plain,y-plain",items:form}]
	});	 	
    
    
	var tb = new Ext.Toolbar({
					baseCls:"x-plain,y-plain",
					//frame: true,
					items : [{
								text : "新增",
								iconCls : "new",
								id : "new",
								handler : function() {
									newData();
								},
								scope : this
							},'-',{
								text : "修改",
								iconCls : "change",
								id : "change",
								handler : function() {
									changeData();
								},
								scope : this
							},'-',{
								text : "删除",
								iconCls : "delete",
								id : "delete",
								handler : function() {
									deleteData();
								},
								scope : this
							}]
				});	 
	
				
				/***
				 *   buttons: [
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
        	},
        	{
            	text: '清空',
            	width:55, 
            	handler: function(){   form.getForm().reset(); }
        	}
				 */
	
      // layout start
    var viewport = new Ext.Viewport({
      //  layout: 'border',
        renderTo: 'main',
        layout:'form',
        items: [tb,panl]
    });
	
	
});



/*点击菜单在面板中显示该节点的信息
	 * */
function showMessage(node)
{

 	var pNode = node.parentNode;

	if(node!=Ext.getCmp('shangPinPanl').getRootNode())
	{
		Ext.getCmp('sjbm').setValue(node.id);
		Ext.getCmp('sjmc').setValue(node.text);
	    Ext.getCmp('spmc').reset();
		
		Ext.getCmp('bz').setValue(node.attributes.bz);
		Ext.getCmp('xybjradio').setValue(node.attributes.xybj);
		
		
		Ext.getCmp('sjbm').removeClass('noReadOnly');
		Ext.getCmp('sjbm').addClass('readOnly');
		
		Ext.getCmp('sjmc').removeClass('readOnly');
		Ext.getCmp('sjmc').addClass('noReadOnly');
		
		
			// 主节点可以新增，不可以修改删除
		Ext.getCmp('new').setDisabled(false);
		Ext.getCmp('change').setDisabled(false);
		Ext.getCmp('delete').setDisabled(false);
		
	
		
	}else
	{
		Ext.getCmp('sjbm').setValue(node.id);
		Ext.getCmp('sjmc').setValue(node.text);
		Ext.getCmp('xybjradio').setValue('1');
		Ext.getCmp('bz').setValue('主节点，不可修改不可以删除');
		
	    Ext.getCmp('spmc').reset();
		
	    Ext.getCmp('sjbm').removeClass('noReadOnly');
		Ext.getCmp('sjbm').addClass('readOnly');
		
		Ext.getCmp('sjmc').removeClass('noReadOnly');
		Ext.getCmp('sjmc').addClass('readOnly');
		
	
		
		// 主节点可以新增，不可以修改删除
		Ext.getCmp('new').setDisabled(false);
		Ext.getCmp('change').setDisabled(true);
		Ext.getCmp('delete').setDisabled(true);
		
	}
	
	//
	
}


 function newData()
 {
 	if(true == baseCheck("newData"))
 	{	
        Ext.getCmp('form').getForm().submit
 		({
 				url: 'ShangPinLB!newOrDele.action',
 				params:{handleCode:'newData'},
 				success:function(form,action)
 				{
 					Ext.MessageBox.alert('信息!!!',action.result.msg);
 					Ext.getCmp("shangPinPanl").root.reload();
 				},
 				failure:function()
 				{
 					Ext.MessageBox.alert('错误!!!','数据保存出错!!!!!');
 				}
 		});
 	}
}

// 修改 取上级名称，上级编码，备注，以及选用标记 ,校验上级名称不能为空
function changeData()
{
	if(true == baseCheck("changeData"))
 	{	
        Ext.getCmp('form').getForm().submit
 		({
 				url: 'ShangPinLB!newOrDele.action',
 				params:{handleCode:'changeData'},
 				success:function(form,action)
 				{
 					Ext.MessageBox.alert('信息!!!',action.result.msg);
 					Ext.getCmp("shangPinPanl").root.reload();
 				},
 				failure:function()
 				{
 					Ext.MessageBox.alert('错误!!!','数据修改出错!!!!!');
 				}
 		});
 	}
}

//删除 取上级类别编码
function deleteData()
{
	Ext.MessageBox.confirm("请确认!!!!!!", "删除会将该商品类别下的所有商品类别全部删除,是否删除?" ,function(button)
	{
		if(button=="yes")
		{	
			Ext.getCmp('form').getForm().submit
	 		({
	 				url: 'ShangPinLB!newOrDele.action',
	 				params:{handleCode:'deleteData'},
	 				success:function(form,action)
	 				{
	 					Ext.MessageBox.alert('信息!!!',action.result.msg);
	 					Ext.getCmp("shangPinPanl").root.reload();
	 				},
	 				failure:function()
	 				{
	 					Ext.MessageBox.alert('错误!!!','数据修改出错!!!!!');
	 				}
	 		});
		}
	});
}

function baseCheck(cs)
{
	if("newData"== cs)
	{
		if(Ext.getCmp('spmc').getValue()=="")
		{
			Ext.MessageBox.alert('错误!!!','新增的类别名称不能为空！！！');
			return false;
		}
	}	
	
	if("changeData"== cs)
	{
		if(Ext.getCmp('sjmc').getValue()=="")
		{
			Ext.MessageBox.alert('错误!!!','上级类别名称不能为空！！！');
			return false;
		}
	}	
	
	return true;
}
	 
function treeBeforeload(node) 
   	{
   		if (!node.isExpanded()) 
   	 	{
			var tree = Ext.getCmp('shangPinPanl');
			var treeid = node.id;
			var url = 'getShangPinTree!getTree.action?treeClick=true&id='+treeid;
			tree.loader.dataUrl = url;
	    }	    
   	}
	
	
	
	 