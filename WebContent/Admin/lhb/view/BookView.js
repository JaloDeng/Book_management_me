Ext.define('Lhb.view.BookView',{
	extend:'Ext.grid.Panel',
	alias:'widget.BookView',
	requires:['Lhb.store.BookStore'],
	itemId:'BookView',
	initComponent:function(){
		var me = this;
		var store = Ext.create('Lhb.store.BookStore');
		Ext.apply(me,{
			loadMask:true,
			frame:true,
			enableKeyNav:true,
			forceFit:true,
			viewConfig:{
				stripeRows:true,
				forceFit:true
			},
			multiSelect:true,
			selType:'checkboxmodel',
			store:store,
			
			columns:[{
//				xtype:'rownumberer',//自动增长
				text:'书名号',
				align:'center',
				width:60,
				dataIndex : 'id'
			},{
				xtype:'gridcolumn',
				text:'书名',
				align:'center',
				width:60,
				dataIndex : 'book_name'
			},{
				xtype:'gridcolumn',
				text:'作者',
				align:'center',
				width:60,
				dataIndex : 'author'
			},{
				xtype:'gridcolumn',
				text:'学科',
				align:'center',
				width:60,
				dataIndex : 'detail'
			},{
				xtype:'gridcolumn',
				text:'价格',
				align:'center',
				width:60,
				dataIndex : 'price'
			},{
				xtype:'gridcolumn',
				text:'简介',
				align:'center',
				width:60,
				dataIndex : 'brief'
			}],
			
			dockedItems:[{
				xtype:'toolbar',
				dock:'top',
				itemId:'operateToolBar',
				items:[{
					xtype:'button',
					text:'添加',
					iconCls:'newIcon',
					iconAlign:'left',
					action:'add_book'
				},{
					xtype:'button',
					text:'修改',
					iconCls:'editIcon',
					iconAlign:'left',
					action:'edit_book'
				},{
					xtype:'button',
					text:'删除',
					iconCls:'deleteIcon',
					iconAlign:'left',
					action:'delete_book'
				},'->',{					
					xtype:'textfield'
//					action:'delete_book'
				},{
					xtype:'button',
					text:'查找',
					iconCls:'query',
//					iconAlign:'left',
					action:'query_book'
				},{
					xtype:'button',
					text:'返回',
//					iconCls:'query',
//					iconAlign:'left',
					action:'back'
				}]},{
					xtype:'pagingtoolbar',
					store:store,
					dock:'bottom',
					emptyMsg:'没有数据',
					displayInfo:true,
					displayMsg:'第{0}条到{1}条,一共{2}条'
				}]
//			}]
		});
		me.callParent(arguments);
	}
});