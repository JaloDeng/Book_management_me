/**
 * 
 */
Ext.define('Lhb.view.EditTypeWindow',{
	extend:'Ext.window.Window',
	alias:'widget.EditTypeWindow',
	requires:['Lhb.store.TypeStore'],
	chooseId:null,

	initComponent:function(){
		var me = this;
		var gridStore= this.fatherWindow; //获取其父类窗口
		var store = Ext.create('Lhb.store.TypeStore');
		var form = Ext.create('Ext.form.Panel',{
			frame:true,
			title:'修改窗口',
			height:290,
			width:350,
			defaultType:'textfield',
			items:[{
				fieldLabel:'序号',
				labelWidth:50,
				name:'id',
				readOnly:true
			},{
				fieldLabel:'学科',
				labelWidth:50,
				allowBlank:false,
				name:'detail'
			}],
			
			buttons:[{
				text:'提交',
//				action:'submit'
				handler:function(btn){
					var me = this;
					var form = btn.up('form').getForm();
					if(form.isValid()){
						form.submit({
//							params:{
//								id : me.chooseId
//							},
							url:'./book/editType',
							method:'POST',
							waitTitle:'提示',
							waitMsg:'提交ing,请稍等...',
							success:function(form,action){   //不添加form,action会如何？
								Ext.Msg.alert('提示','修改成功');
								btn.up('panel').up('window').close();
								gridStore.reload();
//								me.getBookView().getStore().reload();
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
			items:form
		});
		me.callParent(arguments);
		
		form.getForm().load({
			params:{
				id : me.chooseId
			},
			url:'./book/loadType',
			method:'POST'
		});
		
	}
});