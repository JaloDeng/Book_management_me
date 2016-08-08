Ext.define('Lhb.view.BookDetailView', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.BookDetailView',
	requires : [ 'Lhb.store.BookDetailStore' ],
	itemId : 'BookDetailView',
	initComponent : function() {
		var me = this;
		var store = Ext.create('Lhb.store.BookDetailStore');
		 var comboStore = Ext.create('Ext.data.Store', {
	            fields: ['type', 'value'],
	            data : [
	                {"type":"书名", "value":1},
	                {"type":"作者", "value":2},
	                {"type":"书籍类型", "value":3},
	                {"type":"价格", "value":4},
	                {"type":"数量", "value":5},
	                {"type":"ISBN号", "value":6},
	                {"type":"创建时间", "value":7},
	                {"type":"简介", "value":8},
	                {"type":"是否可借", "value":9}
	                ]
	        });
		Ext.apply(me, {
			loadMask : true,
			frame : true,
			enableKeyNav : true,
			forceFit : true,
			viewConfig : {
				stripeRows : true,
				forceFit : true
			},
			multiSelect : true,
			selType : 'checkboxmodel',
			store : store,

			columns : [ {
//				xtype : 'rownumberer',// 自动增长
//				text : '序号',
//				align : 'center',
//				width : 60,
//				dataIndex : 'id'
//			}, {
				xtype : 'gridcolumn',
				text : '书名',
				align : 'center',
				width : 60,
				dataIndex : 'bookName'
			}, {
				xtype : 'gridcolumn',
				text : '作者',
				align : 'center',
				width : 60,
				dataIndex : 'author'
			}, {
				xtype : 'gridcolumn',
				text : '书籍类型',
				align : 'center',
				width : 60,
				dataIndex : 'detail'
			}, {
				xtype : 'gridcolumn',
				text : '价格',
				align : 'center',
				width : 60,
				dataIndex : 'price'
			}, {
				xtype : 'gridcolumn',
				text : '数量',
				align : 'center',
				width : 60,
				dataIndex : 'amount'
			}, {
				xtype : 'gridcolumn',
				text : 'ISBN号',
				align : 'center',
				width : 60,
				dataIndex : 'isbn'
			}, {
				xtype : 'gridcolumn',
				text : '创建时间',
				align : 'center',
				width : 60,
				dataIndex : 'createTime'
			}, {
				xtype : 'gridcolumn',
				text : '简介',
				align : 'center',
				width : 60,
				dataIndex : 'brief'
			}, {
				xtype : 'gridcolumn',
				text : '是否可以借阅',
				align : 'center',
				width : 60,
				dataIndex : 'isLoan',
				renderer : function(isLoan) {
					if (isLoan == '1') {
						return "是";
					}
					if (isLoan == '0') {
						return "否";
					}
				}
			} ],

			dockedItems : [ {
				xtype : 'toolbar',
				dock : 'top',
				itemId : 'operateToolBar',
				items : [ {
					xtype : 'button',
					text : '添加',
					iconCls : 'newIcon',
					iconAlign : 'left',
					action : 'add_BookDetail'
				}, {
					xtype : 'button',
					text : '修改',
					iconCls : 'editIcon',
					iconAlign : 'left',
					action : 'edit_BookDetail'
				}, {
					xtype : 'button',
					text : '删除',
					iconCls : 'deleteIcon',
					iconAlign : 'left',
					action : 'delete_BookDetail'
				}, '->',{
					xtype : 'textfield'
				// action:'delete_book'
				}, {
					xtype : 'combobox',
					fieldLabel : '按',
					width: 100,
	                editable : false,
					labelWidth : 15,
					emptyText: "请选择",
					store:comboStore,
//					allowBlank: false,
//					blankText: "请选择要查询类型",
					displayField: 'type',
					valueField: 'value',
					value: 1,
					name:'query_type'
				}, {
					xtype : 'button',
					text : '查找',
					// iconCls:'query',
					// iconAlign:'left',
					action : 'query_BookDetail'
				}, {
					xtype : 'button',
					text : '返回',
					// iconCls:'query',
					// iconAlign:'left',
					action : 'back'
				} ]
			}, {
				xtype : 'pagingtoolbar',
				store : store,
				dock : 'bottom',
				emptyMsg : '没有数据',
				displayInfo : true,
				displayMsg : '第{0}条到{1}条,一共{2}条'
			} ]
		// }]
		});
		me.callParent(arguments);
	}
});