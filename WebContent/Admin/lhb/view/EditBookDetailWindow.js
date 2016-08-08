/**
 * 
 */
Ext.define('Lhb.view.EditBookDetailWindow',{
	extend:'Ext.window.Window',
	alias:'widget.EditBookDetailWindow',
	requires:['Lhb.store.BookTypeStore'],
	chooseId:null,

	initComponent:function(){
		var me = this;
		var gridStore= this.fatherWindow; // 获取其父类窗口
		var store = Ext.create('Lhb.store.BookTypeStore');
		var formPanel = Ext.create('Ext.form.Panel',{
			frame:true,
			title:'修改窗口',
			height : 400,
			width : 500,
			layout : 'column',
			// defaultType:'textfield',
			bodyStyle : 'padding:30px 5px 0',// 页边距，上、右左、下
			items : [ {
				xtype : 'hidden',
				name:'id',
			},{ 
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
//				id:"title",//不能直接用id，要用itemId，不然会显示与主键冲突
				fieldLabel : '书籍类型',
				labelWidth : 50,
				columnWidth: .5,
				style:"margin-left:10px;margin-right:10px;",
				padding:5,
				store:store,
				displayField: 'detail',
				valueField: 'id',
//              name : 'booktypeId'
				name : 'booktypeId',
//监听，若combobox选择工学，radiogroup隐藏
				listeners: {
                    select: function (combo, record, opts) {
                        if(record[0].get("title")=='工学')
                        {
                            combo.up('panel').up('panel').down('radiogroup').hide();
                        }
                        else
                        {
                            combo.up('panel').up('panel').down('radiogroup').show();
                        }
                    }
                }
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
				itemId: 'isLoan',
				fieldLabel : '是否可以借阅',
				labelWidth : 50,
				columnWidth: .5,
				style:"margin-left:10px;margin-right:10px;",
				padding:5,
				columns: 2,
			    vertical: true,
				 items: [ {
					 boxLabel: '是',
					 name: 'isLoan',
					 inputValue: 1
//					,checked:true
					 }, { 
				     boxLabel: '否',
				     name: 'isLoan',
				     inputValue: 0 
//				   , checked:true
					    	   },
					        
					    ]			
			}, {
				xtype : 'textareafield',
				fieldLabel : '简介',
				labelWidth : 50,
				columnWidth: 1,
				style:"margin-left:10px;margin-right:10px;",
				padding:5,
				name : 'brief'
			} ],
// 这是点击radiogroup后是否触发窗口
// listeners: {
// "change": function() {
// if (Ext.getCmp("isTeacher").getValue().inputValue == "是") {
// Ext.getCmp("fieldEmploy").setVisible(true);
// } else {
// Ext.getCmp("fieldEmploy").setVisible(false);
// }
// }
// } 
			
			buttons:[{
				text:'提交',
				handler:function(btn){
					var me = this;
					var form = btn.up('form').getForm();
					if(form.isValid()){
						form.submit({
							url:'./bookdetail/editBookDetail',
							method:'POST',
							waitTitle:'提示',
							waitMsg:'提交ing,请稍等...',
							success:function(form,action){   // 不添加form,action会如何？
								Ext.Msg.alert('提示','修改成功');
								btn.up('panel').up('window').close();
								gridStore.reload();
							},
							failure:function(form,action){
								Ext.Msg.alert('提示','修改失败');
							}
						});
					}
					
				}
			},{
				text:'取消',
				handler:function(){
					this.up('window').hide(); // 隐藏注册用户的窗口
				}
			}]
		}); 
		Ext.apply(me,{
			items:formPanel
		});
		me.callParent(arguments);
		
		formPanel.getForm().load({
			params:{
				id : me.chooseId
			},
			url:'./bookdetail/loadBookDetail',
			method:'POST',
			success:function(form, action) {
                if(!form.getValues()['isLoan'])
                {
                    formPanel.down('radiogroup').items.get(1).setValue(true);
                }
            }

		});
		
//	 this.getForm().on('beforeSetafterLoad', function(isLoan){
//	  if(isLoan.state == true){
//	  this.owner.getComponent('radiogroup').getComponent('1').setValue(true);
//	  }else if(isLoan.state == false){
//	  this.owner.getComponent('radiogroup').getComponent('0').setValue(true);
//	  }
//	  });
	}
});


