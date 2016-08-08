Ext.define('Lhb.view.TabPanel', {
	extend : 'Ext.tab.Panel',
	alias : 'widget.TabPanel',
	initComponent : function() {
		var me = this;
		Ext.apply(me, {
			region : 'center',
			id : 'content_panel',
			activeTab : 0,
			title : '欢迎!',
			border : false,
			items : [ {
				// iconCls:'tabpanel',
				title : '首页',
				html : '<center><font size=5>欢迎使用本系统！<font></center>'
			} ]

		});
		me.callParent(arguments);
	}

});