Ext.define('Lhb.controller.MenuController', {
	extend : 'Ext.app.Controller',
	requires : [ 'Lhb.view.Menu', 'Lhb.view.BookView', 'Lhb.view.TabPanel' ],
	refs : [ {
		ref : 'Menu',
		selector : 'Menu'
	}, {
		ref : 'TabPanel',
		selector : 'TabPanel'
	} ],
	init : function() {
		var me = this;
		this.control({
			// menu中添加单击事件
			'Menu' : {
				itemclick : me.loadMenu
			}
		});
	},

	loadMenu : function(selModel, record) {
		if (record.get('leaf')) {
			var panel = Ext.getCmp('menu' + record.get('id'));
			if (!panel) {
				panel = Ext.create(record.get('value'), {
					title : record.get('text'),
					id : 'menu' + record.get('id'),
					columnLines : true, // 添加列的框线样式
					// bodyPandding : 0,
					bodyPadding : 0,
					closable : true
				});
				this.openTab(panel, false);
			} else {
				this.openTab(panel, true);
			}
		}
	},

	openTab : function(panel, or) {
		var me = this;
		var main = Ext.getCmp("content_panel");
		if (or) {
			main.setActiveTab(panel);
		} else {
			var p = main.add(panel);
			main.setActiveTab(p);
		}
	}

});