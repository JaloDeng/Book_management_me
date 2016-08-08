/**
 * 
 */
Ext.define('Lhb.view.AddBookDetailWindow', {
	extend : 'Ext.window.Window',
	alias : 'widget.AddBookDetailWindow',
	requires : [ 'Lhb.store.BookTypeStore' ],
	title : '添加学科',
	initComponent : function() {
		var me = this;
		var store = Ext.create('Lhb.store.BookTypeStore');// 被combobox的store调用
		var form = Ext.create('Ext.form.Panel', {
			frame : true,
			title : '数据添加窗口',
			height : 400,
			width : 500,
			layout : 'column',
			// defaultType:'textfield',
			bodyStyle : 'padding:30px 5px 0',// 页边距，上、右左、下
			items : [ { 
				xtype : 'textfield',
				fieldLabel : '书名',
				labelWidth : 50,
				columnWidth : .5,
				style : "margin-left:10px;margin-right:10px;",
				padding : 5,
				allowBlank : false,
				blankText : "请输入新增书名",
				name : 'bookName'
			}, {
				xtype : 'textfield',
				fieldLabel : '作者',
				labelWidth : 50,
				columnWidth : .5,
				style : "margin-left:10px;margin-right:10px;",// 调整左右间距
				padding : 5,// 调整行与行间距
				// allowBlank:false,
				// blankText:"请输入新增学科",
				name : 'author'
			}, {
				xtype : 'combobox',
				fieldLabel : '书籍类型',
				labelWidth : 50,
				columnWidth : .5,
				style : "margin-left:10px;margin-right:10px;",
				padding : 5,
				store : store,
				displayField : 'detail',
				valueField : 'id',
				emptyText : '请选择',
				editable : false,
				allowBlank : false,
				blankText : "请选择书籍类型",
				name : 'booktypeId',
				listeners: {
                    select: function (combo, record, opts) {
                        if(record[0].get("detail")=='工学')
                        {
                            combo.up('panel').up('panel').down('radiogroup').hide();
                        }
                        else
                        {
                            combo.up('panel').up('panel').down('radiogroup').show();
                        }
                    }
                },
			}, {
				xtype : 'textfield',
				fieldLabel : '价格',
				labelWidth : 50,
				columnWidth : .5,
				style : "margin-left:10px;margin-right:10px;",
				padding : 5,
				minValue : 0,
				allowBlank : false,
				blankText : "请输入价格",
				name : 'price'
			}, {
				xtype : 'numberfield',
				fieldLabel : '数量',
				labelWidth : 50,
				columnWidth : .5,
				style : "margin-left:10px;margin-right:10px;",
				padding : 5,
				minValue : 0,// 确定输入的最小值
				negativeText : "数量不能为负数，最少为0",// 当输入为负数，且minValue设置为0时的错误提示
				allowDecimals : false,// 是否允许输入小数,false自动四舍五入
				nanText : "请输入有效整数",
				allowBlank : false,
				blankText : "请输入数量",
				name : 'amount'
			}, {
				xtype : 'textfield',
				fieldLabel : 'ISBN号',
				labelWidth : 50,
				columnWidth : .5,
				style : "margin-left:10px;margin-right:10px;",
				padding : 5,
				regex : /^.{10}$/,// (正则表达式).匹配除 "\n" 之外的任何单个字符。要匹配包括 '\n'
									// 在内的任何字符，请使用象 '[.\n]' 的模式。
				regexText : 'ISBN号由10位字符组成',
				allowBlank : false,
				blankText : "请输入ISBN号",
				name : 'isbn'
			}, {
				xtype : 'datefield',
				format : 'Y-m-d',
				fieldLabel : '创建时间',
				labelWidth : 50,
				columnWidth : .5,
				style : "margin-left:10px;margin-right:10px;",
				padding : 5,
				emptyText : "请选择",
				allowBlank : false,
				blankText : "请选择创建时间",
				name : 'createTime'
			}, {
				xtype : 'radiogroup',
				itemId:"isLoan",
//				hidden:true,
				fieldLabel : '是否可以借阅',
				labelWidth : 50,
				columnWidth : .5,
				style : "margin-left:10px;margin-right:10px;",
				padding : 5,
				// allowBlank:false,
				// blankText:"请输入新增学科",
				// name : 'isLoan',
				columns : 2,
				vertical : true,
				items : [ {
					boxLabel : '是',
					name : 'isLoan',
					inputValue : 1,
					checked: true
				}, {
					boxLabel : '否',
					name : 'isLoan',
					inputValue : 0
				},

				]
			}, {
				xtype : 'textareafield',
				fieldLabel : '简介',
				labelWidth : 50,
				columnWidth : 1,
				style : "margin-left:10px;margin-right:10px;",
				padding : 5,
				// allowBlank:false,
				// blankText:"请输入新增学科",
				name : 'brief'
			} ],

			buttons : [ {
				text : '提交',
				action : 'submit'
			}, {
				text : '取消',
				action : 'cancel'
			} ]
		});

		Ext.apply(me, {
			frame : true,
			items : form
		});
		me.callParent(arguments);
	}
});