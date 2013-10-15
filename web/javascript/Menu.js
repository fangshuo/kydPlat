Ext.onReady(function() { 

	var tb = new Ext.Toolbar({ 
		renderTo: document.body, 
		width: '100%', 
		height: 30 
	}); 
	//
	var filemenu = new Ext.menu.Menu({ 
		shadow: 'frame', 
		items: [{ text: 'New' ,handler: handlerMenu},//, handler: newFile
				 { text: 'Open'},//,handler: addTab("t1","测试","menuTwo!execute.action","true")},
				 { text: 'Save' },
				 { text: 'Export'},
				 { text: 'Import' },
				 { text: '关闭' } 
			   ] 
	}
	); 

	/**
        用以处理菜单项点击事件

     */
	function handlerMenu(item){

        //Ext.Msg.alert("提示","您点击了"+item.text+"项");    
        
        // open新页面可以抽出放在公共js中
		var winheight = screen.availHeight - 55;
		var winwidth = screen.availWidth - 10;
		var param = "height="
				+ winheight
				+ ",width="
				+ winwidth
				+ ",top=0,left=0,toolbar=no,menubar=no,scrollbars=yes,resizable=no,location=no,status=no,titlebar=no,alwaysRaised=yes ";
		window.open("menuOne!execute.action", "", param);
     }
     
     	// 弹出小窗口，将小窗口至于mainTab 中
		function addTab(id, title, url, flag) {
	
			var mainTab = Ext.getCmp('mt');
			var n = mainTab.getComponent(id);
			if (!n) {
				var n = mainTab.add({
							'id' : id,
							'title' : title,
							closable : flag,
							html : '<iframe scrolling="auto" name="'
									+ 'menu2'
									+ 'fr" frameborder="0" width="100%" height="100%" src="'
									+ url + '"></iframe>'
						});
			}
			mainTab.setActiveTab(n);
		}
		//addTab("companyInfo","公司信息","CompanyInfo!execute.action","true")
		// 弹出小窗口，将小窗口至于mainTab 中
		function addTab2() {
	
			var mainTab = Ext.getCmp('mt');
			var n = mainTab.getComponent(id);
			if (!n) {
				var n = mainTab.add({
							'id' : id,
							'title' : '公司信息',
							closable : true,
							html : '<iframe scrolling="auto" name="'
									+ 'CompanyInfo'
									+ 'fr" frameborder="0" width="100%" height="100%" src="'
									+ 'CompanyInfo!execute.action' + '"></iframe>'
						});
			}
			mainTab.setActiveTab(n);
		}

	// 弹出小窗口，将小窗口至于mainTab 中
		function addTab3() {
	
			var mainTab = Ext.getCmp('mt');
			var n = mainTab.getComponent(id);
			if (!n) {
				var n = mainTab.add({
							'id' : id,
							'title' : '商品类别',
							closable : true,
							html : '<iframe scrolling="auto" name="'
									+ 'SplbInfo'
									+ 'fr" frameborder="0" width="100%" height="100%" src="'
									+ 'SplbInfo!execute.action' + '"></iframe>'
						});
			}
			mainTab.setActiveTab(n);
		}
	//
	 var menuFile=new Ext.menu.Menu({   
                items:[{   
                    text:'公司信息',handler: addTab2   
                },{   
                    text:'商品类别',handler: addTab3  
                },{   
                    text:'商品信息'   
                },{   
                    text:'往来单位类别',menu:filemenu   
                },{   
                    text:'往来单位信息'   
                },{   
                    text:'仓库类别'   
                },{   
                    text:'仓库信息'   
                },{   
                    text:'部门信息'   
                },{   
                    text:'职员信息'   
                }]   
             });  
     var dateMenu = new Ext.menu.DateMenu({}); //日期
     //Checkbox 
     var menuCheckbox=new Ext.menu.Menu({   
                items:[   
                    new Ext.menu.CheckItem({   
                        text:'粗体',   
                        checked:true,   
                        checkHandler:function(item,checked){   
                            Ext.Msg.alert('多选',(checked?'选中':'取消')+'粗体');   
                        }   
                    }),   
                    new Ext.menu.CheckItem({   
                        text:'斜体 ',   
                        checked:true,   
                        checkHandler:function(item,checked){   
                            Ext.Msg.alert('多选',(checked?'选中':'取消')+'斜体');   
                        }   
                    })   
                ]    
                 
             }); 
             
      //颜色
      var colormenu=new Ext.menu.ColorMenu({   
                    handler:function(cm,color){   
                        if(typeof color=='string'){   
                            Ext.Msg.alert('选择颜色','选择的颜色是'+color);   
                        }   
                    }                     
             });   
//	
//	//添加第一个工具栏菜单
//	tb.add({ text: '文件', menu: filemenu }); 
//	//添加第二个工具栏菜单
//	tb.add({ text: '基本信息', menu: menuFile });
//	//添加第三个工具栏菜单
//	tb.add({ text: '日期', menu: dateMenu });
//	//添加第四个工具栏菜单
//	tb.add({ text:'字体',  menu: menuCheckbox}); 
//	//添加第五个工具栏菜单
//	tb.add({ text:'颜色',  menu: colormenu});
	
	tb.doLayout(); 
	
	




}); 
