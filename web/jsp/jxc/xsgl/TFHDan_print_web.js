Ext.onReady(function() {

var tb = new Ext.Toolbar({
							renderTo : "toolbar",
							items : [{
										text : "打印",
										iconCls : "print",
										handler : function() {
											print();
										},
										scope : this
									},'-',{
										text : "打印预览",
										iconCls : "print",
										handler : function() {
											printpreview();
										},
										scope : this
									}
									]
						});
});

