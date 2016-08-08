/**
 * 
 */
Ext.define('Lhb.controller.TypeController',{
	extend:'Ext.app.Controller',
	requires:['Lhb.view.TypeView','Lhb.view.AddTypeWindow'],
	refs:[
	      {
	      ref:'TypeView',
	      selector:'TypeView'}
	      ],  
	
	init:function(){
		var me = this;
		this.control({
			'TypeView button[action=add_Type]':{
				click:me.openWindow
			},
			'TypeView button[action=edit_Type]':{
				click:me.openEditWindow
			},
			'TypeView button[action=delete_Type]':{
				click:me.deleteType
			},
			'TypeView button[action=query_Type]' :{
				click:me.query_Type
			},
			'TypeView button[action=back]' :{
				click:me.back
			},
			'AddTypeWindow button[action=submit]':{
				click : me.add
			},
			'AddTypeWindow button[action=cancel]':{
				click : me.add_cancel
			}
		}
		);
	}, 
	
	openWindow:function(){
		Ext.create('Lhb.view.AddTypeWindow').show();
	},
	add_cancel:function(btn){
//		btn.up('AddbookWindow').close();//关闭窗口和隐藏窗口的区别
		btn.up('AddTypeWindow').hide();
	},

			
	add:function(btn){
		var me = this;
		var form = btn.up('form').getForm();
		
		 if(form.isValid()){
			form.submit({
				url:'./book/addType',
				method:'POST',
				waitTitle:'提示',
				waitMsg:'提交ing,请稍等...',
				success:function(form,action){   //不添加form,action会如何？
					Ext.Msg.alert('提示',"添加成功！");
					btn.up('AddTypeWindow').close();
					me.getTypeView().getStore().reload();
				},
				failure:function(form,action){
					Ext.Msg.alert('提示',action.result.msg);
				}
			});
		}
	},
	
	openEditWindow:function(btn){
		console.log('openEditWindow');
		var gridStore = btn.up('gridpanel').getStore(); //获取该按钮所在的窗口gridpanel
//		console.log(btn.up('gridpanel'));
		var selectedID = btn.up('gridpanel').getSelectionModel().getSelection();
		var length = selectedID.length;
		if(length==0){
			Ext.Msg.alert('提示','请选择数据！');
			return;
		}
		if(length>1){
			Ext.Msg.alert('提示','只能选择一条数据！');
			return;
		}
		if(length==1){
			var editWin = Ext.create('Lhb.view.EditTypeWindow',{
				chooseId : selectedID[0].get('id'),
				fatherWindow : gridStore
			});
			editWin.show();
		}
	},
	
	deleteType:function(btn){
		var me = this;
		var records = me.getTypeView().getSelectionModel().getSelection();
//		var records = btn.up('gridpanel').getSelectionModel().getSelection();
		var i = records.length;
		if(i==0)
			{
				Ext.Msg.alert('提示','请选择一条数据！');
				return;
			}
		var ids = new Array();
		Ext.each(records,function(record){ //迭代一个数组，在每个元素上调用给定的回调函数。records->record
			ids.push(record.get('id'));     //操作record参数
//			console.log(ids);
		});
		Ext.Msg.confirm('提示','你确定要删除吗？',
			function(button){
				if(button=='yes'){
					Ext.Ajax.request({
						url:'./book/deleteType',
						method:'POST',
						params: {
						        id: ids
						    },
						    success: function(){
						    	Ext.Msg.alert('提示','删除成功!');
						    	Ext.Array.each(records,function(record){
						    		me.getTypeView().getStore().remove(record);
						    	});
//						    	btn.up('window').close;
						    },
						    failure:function(){
						    	Ext.Msg.alert('提示','删除失败!');
						    }
					});
				}
			}
		);
		
	},
	
	query_Type:function(btn){
		console.log('query_Type');
		var me = this;
		var detailrecords = btn.up('toolbar').down('textfield').getValue();
//		console.log(btn.up('toolbar'));
		me.getTypeView().getStore().getProxy().extraParams.detail=detailrecords;
//		console.log(me.getTypeView().getStore().getProxy());
		me.getTypeView().getStore().reload();
	},
			
	back:function(btn){
		console.log('back');
		var me = this;
		var detailrecords = btn.up('toolbar').down('textfield').setValue();
		me.getTypeView().getStore().getProxy().extraParams.detail=null;
//		btn.up('gridpanel').getBookView().getStore().reload;
		me.getTypeView().getStore().reload();
	}	
});