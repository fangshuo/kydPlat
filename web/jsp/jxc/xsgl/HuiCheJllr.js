Ext.onReady(function() {
		var tb = new Ext.Toolbar({
					renderTo : "toolbar",
					items : [{
								text : "查询",
								iconCls : "query",
								id : "query",
								handler : function() {

									queryData();
								},
								scope : this
							},'-',
							{
								text : "提交",
								iconCls : "submit",
								id : "submitBtn",
								handler : function() {

									submitData();
								},
								scope : this
							},'-',{
								text : "重置",
								iconCls : "reset",
								id : "reset",
								handler : function() {
									document.location.reload();
								},
								scope : this
							}]
				});
				
			var xsdhField = new Ext.form.TextField({
		   id:'xsdhField',
		   fieldLabel: '销售单号',
		   xtype: 'hidden',
		   name: 'xsdhField'
		});		
});

function queryData()
{
	if(Ext.getDom('tfhdh').value== "")
	{
		Ext.Msg.alert("错误！！","请输入提发货单号！！！！");
		return;
	}
	
	Ext.Ajax.request
	({    
		url:'HuiCheJllr!queryData.action', 
		params: 'tfhdh='+Ext.getDom('tfhdh').value, 
		method:'POST',
		success: function(resp,opts) 
	    { 
	     	var res = Ext.decode(resp.responseText);
	     	if(res.success == false)
	     	{
	     		Ext.Msg.alert('信息',res.msg);
	     		Ext.getDom('tfhdh').value = "";
	     	}else
	     	{
	     		Ext.getDom('fhsj').value = res.fhsj;
				Ext.getDom('kpy').value = res.kpy;
				Ext.getDom('kczl').value = formatNambToDouble(res.kczl);//空车重量
				Ext.getDom('zczl').value = formatNambToDouble(res.zczl);//装车重量
				Ext.getDom('sfzl').value = formatNambToDouble(res.sfzl);//实发重量
				Ext.getDom('ffkh').value = res.ffkh;//实发重量
				Ext.getDom('ccbh').value = res.ccbh;//出厂编号
				Ext.getDom('jhdh').value = res.jhdh;
				Ext.getDom('khmc').value = res.khmc;
				Ext.getDom('zkhmc').value = res.zkhmc;
				Ext.getDom('pzgg').value = res.pzgg;
				Ext.getDom('jzsl').value = formatNambToDouble(res.jzsl);
				Ext.getDom('cydw').value = res.cydwmc;
				Ext.getDom('cycl').value = res.cyclbm;
				Ext.getDom('jhsl').value = formatNambToDouble(res.jhsl);
				Ext.getDom('fhlj').value = formatNambToDouble(res.fhlj);
				Ext.getDom('ys').value = formatNambToDouble(parseFloat(res.jhsl)-parseFloat(res.fhlj)+parseFloat(res.zrsl)-parseFloat(res.zcsl));
				Ext.getCmp('xsdhField').setValue(res.jhdh);
	     	}
	
	    },
	    failure:function()
		{
			Ext.Msg.alert('错误','操作失败!!');
		}
	});	  

}


function jsdataByhczl(obj)
{
	//先判断是不是数字，如果是格式化
	var c= checkedAndFromt(obj);
	if(c==false)
	{
		return;
	}
	
	var hczl =   parseFloat(c);// 回车重量(吨)	
	
	var kczl = parseFloat(Ext.getDom('kczl').value);// 空车重量(吨)  
	var zczl = parseFloat(Ext.getDom('zczl').value);// 装车重量(吨)
	
	
	var fhlj = parseFloat(Ext.getDom('fhlj').value)//发货累计
	var ys = parseFloat(Ext.getDom('ys').value)// 余数
	
	//SFZL(实发重量)=装车重量-空车重量-(回车重量-空车重量)
	Ext.getDom('sfzl').value = formatNambToDouble(zczl-kczl-(hczl - kczl));
	Ext.getDom('fhlj').value = formatNambToDouble(fhlj - (hczl - kczl));
	Ext.getDom('ys').value   = formatNambToDouble(ys+(hczl - kczl))
	
}


function submitData()
{
	var sfzl = Ext.getDom('sfzl').value;
	var hczl = Ext.getDom('hczl').value;
	
	if(sfzl== "")
	{
		Ext.Msg.alert("错误！！","请输入提发货单查询后保存！！！");
		return;
	}
	if(hczl == "")
	{
		Ext.Msg.alert("错误！！","请输入回车重量！！！");
		return;
	}
	
	Ext.Ajax.request
	({    
		url:'HuiCheJllr!submitData.action', 
		params: {tfhdh:Ext.getDom('tfhdh').value,sfzl:sfzl,hczl:hczl,xsdh:Ext.getCmp('xsdhField').getValue(),ys:Ext.getDom('ys').value}, 
		method:'POST',
		success: function(resp,opts) 
	    { 
	     	var res = Ext.decode(resp.responseText);
			Ext.Msg.alert('消息',res.msg);	
			Ext.getCmp('submitBtn').setDisabled(true);
	    },
	    failure:function()
		{
			Ext.Msg.alert('错误','操作失败!!');
		}
	});	  
}