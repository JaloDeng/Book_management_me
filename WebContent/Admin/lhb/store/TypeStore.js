Ext.define('Lhb.store.TypeStore',{
	extend:'Ext.data.Store',
	fields:['id','detail'],
	proxy:{
		waitTitle:'提示',
		waitMsg:'加载中...',
		url:'./book/getType',
		type:'ajax',
		reader:{
			type:'json',
			root:'items',
			totalProperty:'total'
	}	
	},
	remoteSort:true,
	autoLoad:true
	
});