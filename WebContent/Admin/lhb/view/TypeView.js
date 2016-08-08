/**
 * 
 */
Ext.define('Lhb.view.TypeView',{
	extend:'Ext.grid.Panel',
	alias:'widget.TypeView',
	requires:['Lhb.store.TypeStore'],
	itemId:'TypeView',
	initComponent:function(){
		var me = this;
		var store = Ext.create('Lhb.store.TypeStore');
		Ext.apply(me,{
			loadMask:true,
			frame:true,
			enableKeyNav:true,
			forceFit:true,
			viewConfig:{
				stripeRows:true,
				selType:'checkboxmodel',
				forceFit:true
			},
			multiSelect:true,
			selType:'checkboxmodel',
			store:store,
			
			columns:[{
//				xtype:'rownumberer',//自动增长
				text:'序号',
				align:'center',
				width:60,
				dataIndex : 'id'
			},{
				xtype:'gridcolumn',
				text:'学科',
				align:'center',
				width:60,
				dataIndex : 'detail'
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
					action:'add_Type'
				},{
					xtype:'button',
					text:'修改',
					iconCls:'editIcon',
					iconAlign:'left',
					action:'edit_Type'
				},{
					xtype:'button',
					text:'删除',
					iconCls:'deleteIcon',
					iconAlign:'left',
					action:'delete_Type'
				},'->',{					
					xtype:'textfield'
//					action:'delete_book'
				},{
					xtype:'button',
					text:'查找',
//					iconCls:'query',
//					iconAlign:'left',
					action:'query_Type'
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