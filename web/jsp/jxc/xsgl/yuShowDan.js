Ext.onReady(function() {
	var tb = new Ext.Toolbar({
				renderTo : "toolbar",
				items : [{
							text : "提交",
							iconCls : "submit",
							id : "submitBtn",
							handler : function() {
								submitData();
							},
							scope : this
						}, '-', {
							text : "重置",
							iconCls : "reset",
							id : "reset",
							handler : function() {
								document.location.reload();
							},
							scope : this
						}, '-', {
							text : "打印（套打）",
							id : "pritBtn",
							iconCls : "print",
							handler : function() {
								printTable('tt');
							},
							scope : this
						}, '-', {
							text : "打印（web）",
							id : "pritBtn2",
							iconCls : "print",
							handler : function() {
								printTable('web');
							},
							scope : this
						}]
			});

	// 发货时间
	var fhsj = new Ext.form.DateField({
		applyTo : 'kpsj',
		width : '70%',
		format : 'Y-m-d H:i:s',
		emptyText : '请选择日期 ...'
			// value:new Date()
		});

	fhsj.on('select', function(obj, date) {
				fhsj.setValue(getDate(date));
			});

	// //关键字
	// var gjzField = new Ext.form.TextField({
	// id:'gjzField',
	// fieldLabel: '关键字',
	// name: 'gjzField',
	// applyTo:'gjz'
	// });

	// 客户名称下拉框
	var khCombo = new Ext.form.ComboBox({
				id : 'khCombo',
				applyTo : 'khmc',
				// width:'50%',
				name : 'khmcText',
				hiddenName : 'khbm',
				xtype : 'combo',
				allowBlank : false,
				store : new Ext.data.Store({
							autoLoad : false,
							proxy : new Ext.data.HttpProxy({
										url : 'ComboboxAction!queryKhxx.action'
									}),
							reader : new Ext.data.JsonReader({
										root : 'combobox',
										fields : ['value', 'text']
									}),
							remoteSort : true
						}),
				emptyText : '请选择',
				mode : 'remote',
				triggerAction : 'all',
				valueField : 'value',
				displayField : 'text',
				readOnly : false
			});

	// //关键字
	// var gjzField2 = new Ext.form.TextField({
	// id:'gjzField2',
	// fieldLabel: '关键字',
	// name: 'gjzField2',
	// applyTo:'gjz2'
	// });

	// 子客户名称下拉
	// var zkhCombo = new Ext.form.ComboBox({
	// id:'zkhCombo',
	// applyTo: 'zkhmc',
	// width:'80%',
	// name: 'zkhmcText',
	// hiddenName: 'zkhbm',
	// xtype: 'combo',
	// store: new Ext.data.Store({
	// autoLoad:false,
	// proxy: new Ext.data.HttpProxy({
	// url:'ComboboxAction!queryZkhdm.action?kpbj=1'}),
	// reader: new Ext.data.JsonReader({
	// root:'combobox',
	// fields:['value','text']}),
	// remoteSort: true }),
	// emptyText: '请选择',
	// mode: 'remote',
	// triggerAction: 'all',
	// valueField: 'value',
	// displayField: 'text',
	// readOnly: false
	// });

	// 品种规格名称下拉
	var spxx = new Ext.form.ComboBox({
				id : 'spCombo',
				applyTo : 'pzgg',
				width : '80%',
				name : 'spmcText',
				hiddenName : 'spbm',
				xtype : 'combo',
				store : new Ext.data.Store({
							autoLoad : false,
							proxy : new Ext.data.HttpProxy({
										url : 'ComboboxAction!queryPpgg.action'
									}),
							reader : new Ext.data.JsonReader({
										root : 'combobox',
										fields : ['value', 'text']
									}),
							remoteSort : true
						}),
				emptyText : '请选择',
				mode : 'remote',
				triggerAction : 'all',
				valueField : 'value',
				displayField : 'text',
				readOnly : true
			});

//	spxx.on('select', function(comboBox) {
//				var spid = comboBox.getValue();
//				var khid = Ext.getCmp('khCombo').getValue();
//
//				// 调用ajax 从后台获取列名
//				Ext.Ajax.request({
//							url : 'YuShowDan!queryJC.action',
//							params : 'spid=' + spid+'&khid='+khid,
//							method : 'POST',
//							success : function(resp, opts) {
//								var res = Ext.util.JSON
//										.decode(resp.responseText);
//								Ext.getDom('zrsl').value = formatNambToDouble(res[0].JC);
//							},
//							failure : function() {
//								Ext.Msg.alert("消息", "加载数据出错");
//							}
//						});
//			});

	// //关键字触发事件
	// gjzField.on('change', function(){
	// khCombo.setValue("");
	// khCombo.getStore().reload({callback: function(records, options, success)
	// {
	// if( khCombo.getStore().getCount()>0)
	// {
	// var firstValue =
	// khCombo.getStore().getRange()[0].data.value;//这种方法可以获得第一项的值
	// khCombo.setValue(firstValue);//选中
	//											 							
	// }
	// }
	// });
	// });
	//       
	//       
	// //关键字触发事件
	// gjzField2.on('change', function(){
	// zkhCombo.setValue("");
	// zkhCombo.getStore().reload({callback: function(records, options, success)
	// {
	// if( zkhCombo.getStore().getCount()>0)
	// {
	// var firstValue =
	// zkhCombo.getStore().getRange()[0].data.value;//这种方法可以获得第一项的值
	// zkhCombo.setValue(firstValue);//选中
	//											 							
	// }
	// }
	// });
	// });

	// 客户编码
	// var khbm = "";
	// khCombo.on('select', getZKH);
	//    
	// function getZKH(){
	// zkhCombo.setValue(""); //子客户下拉框制空
	// // 清空子客户的内容
	// //zkhCombo.getStore().removeAll();
	// khbm = Ext.get('khbm').dom.value;
	//       	
	// zkhCombo.getStore().reload({callback: function(records, options, success)
	// {
	// /*if(0 == zkhCombo.getStore().getCount())
	// {
	// Ext.MessageBox.alert('消息!!!','没有对应的子客户信息，请重新选择！！！');
	// }
	// else{
	// var firstValue =
	// zkhCombo.getStore().getRange()[0].data.value;//这种方法可以获得第一项的值
	// zkhCombo.setValue(firstValue);//选中
	// }*/
	// }
	// });
	// }

	var pymValue = "";

	Ext.getCmp('khCombo').on('beforequery', function(e) {
		if (!e.forceAll) {
			pymValue = e.query;
			// if (!pymValue == "")
			Ext.getCmp('khCombo').getStore().reload({
						callback : function(records, options, success) {
							// if( Ext.getCmp('khCombo').getStore().getCount()>1
							// && (!pymValue == ""))
							// {
							// var firstValue =
							// Ext.getCmp('khCombo').getStore().getRange()[1].data.value;//这种方法可以获得第一项的值
							// Ext.getCmp('khCombo').setValue(firstValue);//选中
							// Ext.getCmp('khCombo').focus();
							//											 							
							// }
						}
					});
		}
			// }
		});

	var pym = "";
	Ext.getCmp('khCombo').getStore().on('beforeload', function() {
				Ext.apply(this.baseParams, {
							pym : pymValue
						});
			});

		// var pymValue2 ="";
		//       
		// Ext.getCmp('zkhCombo').on('beforequery',function(e){
		// if(!e.forceAll){
		// pymValue2 = e.query;
		// //if (!pymValue == "")
		// Ext.getCmp('zkhCombo').getStore().reload({callback: function(records,
		// options, success)
		// {
		// // if( Ext.getCmp('zkhCombo').getStore().getCount()>0 && (!pymValue2
		// == ""))
		// // {
		// // var firstValue =
		// Ext.getCmp('zkhCombo').getStore().getRange()[1].data.value;//这种方法可以获得第一项的值
		// // Ext.getCmp('zkhCombo').setValue(firstValue);//选中
		// // Ext.getCmp('zkhCombo').foucs();
		// // }
		//									
		// Ext.getCmp('zkhCombo').focus();
		// }
		// });
		// }
		// //}
		// });
		//    
		// var zkhpym ="";
		// Ext.getCmp('zkhCombo').getStore().on('beforeload', function() {
		// Ext.apply(this.baseParams, {
		// zkhpym : pymValue2
		// });
		// });

		// 关键字传参数
		// var pym ="";
		// khCombo.getStore().on('beforeload', function() {
		// Ext.apply(this.baseParams, {
		// pym : gjzField.getValue()
		// });
		// });
		//     
		// var zkhpym ="";
		// zkhCombo.getStore().on('beforeload', function() {
		// Ext.apply(this.baseParams, {
		// zkhpym : gjzField2.getValue()
		// });
		// });

		// zkhCombo.getStore().on('beforeload', function() {
		// if("" == khbm)
		// {
		// Ext.MessageBox.alert('消息!!!','请先选择客户名称！！！');
		// return false;
		// }else
		// {
		// Ext.apply(this.baseParams,{khbm:khbm});
		// }
		// });

});

function submitData() {
	if (baseCheck()) {
		var data = fzData('save');
		Ext.Ajax.request({
					url : 'YuShowDan!savaData.action',
					params : 'data=' + encodeURIComponent(data),
					method : 'POST',
					success : function(resp, opts) {
						var result = Ext.decode(resp.responseText);
						Ext.getDom('jhdh').value = result.fhdh;
						Ext.Msg.alert('信息', result.msg);
						Ext.getCmp('submitBtn').setDisabled(true);
					},
					failure : function() {
						Ext.Msg.alert('错误', '操作失败!!');
					}
				});
	}

}

function baseCheck() {

	if (Ext.getCmp('khCombo').getValue() == "%"
			|| Ext.getCmp('khCombo').getValue() == "") {
		Ext.Msg.alert('错误', '请选择客户名称!!');
		return false;
	}
	if (Ext.getCmp('spCombo').getValue() == "") {
		Ext.Msg.alert('错误', '请选择商品规格!!');
		return false;
	}
	if (Ext.getDom('sl').value == "") {
		Ext.Msg.alert('错误', '请填写数量!!');
		return false;
	}
	if (Ext.getDom('dj').value == "") {
		Ext.Msg.alert('错误', '请填写单价!!');
		return false;
	}
	return true

}

function fzData(bj) {
	var record = new Ext.data.Record();

	record.set('kpsj', Ext.getDom('kpsj').value);
	//record.set('zrsl', Ext.getDom('zrsl').value);
	record.set('sl', Ext.getDom('sl').value);
	record.set('dj', Ext.getDom('dj').value);
	record.set('bz', Ext.getDom('bz').value);
	record.set('kpy', Ext.getDom('kpy').value);

	if (bj == "save") {
		record.set('khbm', Ext.getCmp('khCombo').getValue());
		record.set('spbm', Ext.getCmp('spCombo').getValue());
	} else {
		record.set('khmc', Ext.getDom('khmc').value);

		// var zkhmc = Ext.getDom('zkhmc').value;
		// if(Ext.getDom('zkhmc').value=="请选择")
		// {
		// zkhmc ="";
		// }
		// record.set('zkhmc' ,zkhmc);
		record.set('pzgg', Ext.getDom('pzgg').value);
		record.set('jhdh', Ext.getDom('jhdh').value);
		record.set('je', Ext.getDom('je').value);
		record.set('dxje', Ext.getDom('dxje').value);

	}

	var jsonArray = [];

	Ext.each(record, function(item) {
				jsonArray.push(item.data);
			});

	data = Ext.encode(jsonArray);

	return data;

}

function jsje1(obj) {
	if (testNum(obj.value)) {
		var sl = formatNambToDouble(obj.value);
		obj.value = sl;
		var dj = Ext.getDom('dj').value;

		if (dj != "") {
			var je = Math.round(parseFloat(sl * dj) * 100) / 100;
			Ext.getDom('je').value = formatNambToDouble(je);
			var newchar = Arabia_to_Chinese(je.toString());
			Ext.getDom('dxje').value = newchar;
		}
	}
}

function jsje2(obj) {
	if (testNum(obj.value)) {
		var sl = Ext.getDom('sl').value;
		var dj = formatNambToDouble(obj.value);
		obj.value = dj;
		if (sl != "") {
			var je = Math.round(parseFloat(sl * dj) * 100) / 100;
			Ext.getDom('je').value = formatNambToDouble(je)
			var newchar = Arabia_to_Chinese(je.toString())
			Ext.getDom('dxje').value = newchar;
		}

	}
}

function printTT() {
	if ("" == Ext.getDom('jhdh').value) {
		Ext.Msg.alert('错误', '保存数据后打印！！！');
	} else {
		var data = fzData("");
		var url = 'YuShowDanPrint!PrintData.action?data='
				+ encodeURIComponent(data);
		openMaxWindow(url);
	}
}

function printTable(flag) {
	if ("" == Ext.getDom('jhdh').value) {
		Ext.Msg.alert('错误', '保存数据后打印！！！');
	} else {
		var data = fzData("");
		var url = 'YuShowDanPrint!PrintData.action?flag=' + flag + '&data='
				+ encodeURIComponent(data);
		openMaxWindow(url);
	}
}
