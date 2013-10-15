Ext.ns("Morik", "Morik.Office", "Morik.Util", "Morik.Office.Department");
Morik.Office.MainingPanel = Ext.extend(Ext.TabPanel, {
	initComponent : function() {
		// 一些初始化工作
		Morik.Office.MainingPanel.superclass.initComponent.call(this);
		this._cache = {};

	}
});
