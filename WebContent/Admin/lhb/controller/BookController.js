Ext.define('Lhb.controller.BookController',{
	extend:'Ext.app.Controller',
	requires:['Lhb.view.BookView','Lhb.view.AddbookWindow'],
	refs:[
	      {
	      ref:'BookView',
	      selector:'BookView'}
	      ],  
	
	init:function(){
		var me = this;
		this.control({
			'BookView button[action=add_book]':{
				click:me.openWindow
			},
			'BookView button[action=edit_book]':{
				click:me.openEditWindow
			},
			'BookView button[action=delete_book]':{
				click:me.deleteBook
			},
			'BookView button[action=query_book]' :{
				click:me.query_book
			},
			'BookView button[action=back]' :{
				click:me.back
			},
			'AddbookWindow button[action=submit]':{
				click : me.add
			},
			'AddbookWindow button[action=cancel]':{
				click : me.add_cancel
			}
		}
		);
	}, 
	
	openWindow:function(){
		Ext.create('Lhb.view.AddbookWindow').show();
	},
	add_cancel:function(btn){
//		btn.up('AddbookWindow').close();//关闭窗口和隐藏窗口的区别
		btn.up('AddbookWindow').hide();
	},

			
	add:function(btn){
		var me = this;
		var form = btn.up('form').getForm();
		if(form.isValid()){
			form.submit({
				url:'./book/addBook',
				method:'POST',
				waitTitle:'提示',
				waitMsg:'提交ing,请稍等...',
				success:function(form,action){   //不添加form,action会如何？
					Ext.Msg.alert('提示','添加成功');
					btn.up('AddbookWindow').close();
					me.getBookView().getStore().reload();
				},
				failure:function(form,action){
					Ext.Msg.alert('提示','添加失败');
				}
			});
		}
	},
	
	openEditWindow:function(btn){
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
			var editWin = Ext.create('Lhb.view.EditbookWindow',{
				chooseId : selectedID[0].get('id'),
				fatherWindow : gridStore
			});
			editWin.show();
		}
	},
	
	deleteBook:function(btn){
		var me = this;
		var records = me.getBookView().getSelectionModel().getSelection();
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
						url:'./book/deleteBook',
						method:'POST',
						params: {
						        id: ids
						    },
						    success: function(){
						    	Ext.Msg.alert('提示','删除成功!');
						    	Ext.Array.each(records,function(record){
						    		me.getBookView().getStore().remove(record);
						    	});
//						    	btn.up('window').close;
						    },
						    failure:function(){
						    	Ext.Msg.alert('提示','删除失败@!');
						    }
					});
				}
			}
		);
		
	},
	
	query_book:function(btn){
		var me = this;
		var authorrecords = btn.up('toolbar').down('textfield').getValue();
//		console.log(btn.up('toolbar'));
		me.getBookView().getStore().getProxy().extraParams.name=authorrecords;
//		console.log(me.getBookView().getStore().getProxy());
		me.getBookView().getStore().reload();
	},
		
	back:function(btn){
		var me = this;
//		btn.up('gridpanel').getBookView().getStore().reload;
		 btn.up('toolbar').down('textfield').setValue(null);
		me.getBookView().getStore().getProxy().extraParams.name=null;
		me.getBookView().getStore().reload();
	}
	
	
	
	
});