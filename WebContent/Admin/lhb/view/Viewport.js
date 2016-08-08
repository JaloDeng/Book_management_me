Ext.define('Lhb.view.Viewport', {
	extend : 'Ext.container.Viewport',
	// 引入文件
	requires : [ 'Lhb.view.Menu', 'Lhb.view.TabPanel' ],
	layout : 'border',

	initComponent : function() {
		var me = this;
		Ext.applyIf(me, {
			items : [ {
				region : 'north',
				title : '图书管理系统',
				height : 100,
				xtype : 'panel',
				html : '<center>西三图书管理系统</center>',
				bodyStyle : 'font-size:50px'
			}, {
				region : 'west',
				title : '导航栏',
				width : 200,
				xtype : 'Menu',
				split : true,
				collapsible : true
			}, {
				region : 'center',
				xtype : 'TabPanel', // 树动态加载
				collapsible : true,
				layout : 'fit'
			} ]
		});
		me.callParent(arguments);
	}

});