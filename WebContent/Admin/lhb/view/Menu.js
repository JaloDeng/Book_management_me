Ext.define('Lhb.view.Menu', {
	extend : 'Ext.tree.Panel',
	requires : [ 'Lhb.store.MenuStore' ],
	alias : 'widget.Menu',
	initComponent : function() {
		var me = this;
		var store = Ext.create('Lhb.store.MenuStore');
		Ext.apply(me, {
			id : 'SystemMenus',
			rootVisible : false,// 设置为false,在本store的数据集合中不包含根节点
			autoScroll : false,// 'true'使用溢出：'自动'的组件布局元素，并在必要时自动显示滚动条，
								// 'false'溢出的内容
			store : store,
			draggable : true
		});
		me.callParent(arguments);
	}
});