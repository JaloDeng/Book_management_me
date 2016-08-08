Ext.define('Lhb.store.MenuStore',{
	extend:'Ext.data.TreeStore', //为'Ext.data.Store'会怎样？
	requires:['Lhb.model.MenuModel'],
	model:'Lhb.model.MenuModel',
	pageSize:12,
	proxy:{
		waitTitle:'提醒',
		waitMsg:'加载中...',
		url:'./menu/getMenu',
		type:'ajax'
	},
	root:{
		expanded:true
	},
	autoLoad:true
});