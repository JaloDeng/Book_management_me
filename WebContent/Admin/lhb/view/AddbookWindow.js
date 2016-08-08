Ext.define('Lhb.view.AddbookWindow',{
	extend:'Ext.window.Window',
	alias:'widget.AddbookWindow',
	requires:['Lhb.store.TypeStore'],
	title:'添加书籍',
	initComponent:function(){
		var me = this;
		var store = Ext.create('Lhb.store.TypeStore');
		var form = Ext.create('Ext.form.Panel',{
			frame: true,
//			title:'数据添加窗口',
			height:290,
			width:350,
			defaultType:'textfield',
			bodyStyle : 'padding:30px 5px 0',//页边距，上、右左、下
			items:[{
				fieldLabel:'ID号',
				labelWidth:50,
				name:'id'
			},{
				fieldLabel:'书名',
				labelWidth:50,
				name:'book_name'
			},{
				fieldLabel:'作者',
				labelWidth:50,
				name:'author'
			},{
				fieldLabel:'学科',
				labelWidth:50,
				name:'type_id',
				xtype:'combobox',
				store:store,
				displayField: 'detail',
				valueField: 'id',
				emptyText:'请选择',
				editable:false
			},{
				fieldLabel:'价格',
				labelWidth:50,
				name:'price'
			},{
				fieldLabel:'简介',
				labelWidth:50,
				name:'brief'
			}],
			//Spring data JPA Spring Hibernate Spring MVC
			buttons:[{
				text:'提交',
				action:'submit'
			},{
				text:'取消',
				action:'cancel'
			}]
		});
		
		Ext.apply(me,{
			frame:true,
			items:form
		});
		me.callParent(arguments);
	}
});