/**
 * 
 */
Ext.define('Lhb.view.AddTypeWindow',{
		extend:'Ext.window.Window',
		alias:'widget.AddTypeWindow',
		requires:['Lhb.store.TypeStore'],
		title:'添加学科',
	initComponent:function(){
		var me = this;
		var store = Ext.create('Lhb.store.BookDetailStore');
		var form = Ext.create('Ext.form.Panel',{
			frame: true,
			title:'数据添加窗口',
			height:290,
			width:350,
			defaultType:'textfield',
			bodyStyle : 'padding:30px 5px 0',//页边距，上、右左、下
			items:[{
				fieldLabel:'序号',
				labelWidth:50,
				allowBlank:false,
				blankText:"请输入新增学科",
				name:'id'
			},{
				fieldLabel:'学科',
				labelWidth:50,
				allowBlank:false,
				blankText:"请输入新增学科",
				name:'detail'
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