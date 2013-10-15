Ext.onReady(function() {
	//初始化信息提示功能
	Ext.QuickTips.init();
	//统一指定错误信息提示浮动显示方式
	Ext.form.Field.prototype.msgTarget = 'side';

    // form start
    var form = new Ext.form.FormPanel({
        title: '用户密码修改',
        id: 'form',
        region: 'center',
        frame: true,
        width: 300,
        autoHeight: true,
        labelAlign: 'right',
        labelWidth: 80,
        defaultType: 'textfield',
        buttonAlign :"center",
        defaults : {
			border : false,
			//allowBlank : false,
			msgTarget : 'side'
			//blankText : '该字段不允许为空'
		},
        items: [{
            fieldLabel: '用户名',
            name: 'user_id',
            id: 'user_id',
            allowBlank: false,   
		    blankText: "该输入项不能为空" ,
		    maxLength: 20,
            maxLengthText:'数字长度不能大于20位',
            readOnly:true
        },{
            fieldLabel: '旧密码',
     		inputType : 'password',
            name: 'jpass',
            id: 'jpass',
            allowBlank: false,   
		    blankText: "该输入项不能为空" ,
		    maxLength: 20,
            maxLengthText:'数字长度不能大于20位'
        },{
            fieldLabel: '新密码',
           	inputType : 'password',
            name: 'xpass',
            id: 'xpass',
            allowBlank: false,   
		    blankText: "该输入项不能为空" ,
            maxLength: 80,
            maxLengthText:'数字长度不能大于80位'
        }, {
            fieldLabel: '确认新密码',
           	inputType : 'password',
            name:"qrpass",
            id: 'qrpass',
            allowBlank: false,   
		    blankText: "该输入项不能为空" ,
		    maxLength: 20,
            maxLengthText:'数字长度不能大于20位'
        }],
        buttons: [{
            text: '确定',
            handler: function() {
                if (!form.getForm().isValid()) {
                    return;
                }else {
                	var user_id = Ext.getCmp("user_id").getValue();
                	var jpass = Ext.getCmp("jpass").getValue();
                	var xpass = Ext.getCmp("xpass").getValue();
                	var qrpass = Ext.getCmp("qrpass").getValue();
                	if(xpass==qrpass){
                		 // 修改
	                    form.getForm().submit({
	                        url: 'userManager!updatePass.action',
	                        
	                        
	                        success:function(form,action)
							{
								Ext.MessageBox.alert('信息提示',action.result.msg);
							},
							failure:function()
							{
								Ext.MessageBox.alert('错误提示',action.result.msg);
							}
	                    });
                	}else{
                		Ext.Msg.alert('消息提示', "您两次输入的密码不一致！！！");
                	}
                   
                }
            }
        },{
            text: '清空',
            handler: function() {
                Ext.getCmp('jpass').setValue("");
                Ext.getCmp('xpass').setValue("");
                Ext.getCmp('qrpass').setValue("");
            }
        },{
            text: '退出',
            handler: function() {
                window.close();
            }
        }]
    });
    // form end

    // 单击修改信息 end

    // layout start
    var viewport = new Ext.Viewport({
        layout: 'border',
        items: [{
            region: 'center',
            contentEl: 'head'
        }, form]
    });
    
    //获取session中的值显示在页面
	Ext.getCmp('user_id').setValue(Ext.get("uid").dom.value);

});
