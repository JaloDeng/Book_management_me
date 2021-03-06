Ext.define('Lhb.store.BookStore',{
	extend:'Ext.data.Store',
	requires:['Lhb.model.BookModel'],
	model:'Lhb.model.BookModel',
	pageSize:12,
	proxy:{
			waitTitle:'提醒',
			waitMsg:'加载中...',
			url:'./book/getBook',
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