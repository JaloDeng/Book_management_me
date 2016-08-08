/**
 * 
 */
Ext.define('Lhb.controller.BookDetailController',{
	extend:'Ext.app.Controller',
	requires:['Lhb.view.BookDetailView','Lhb.view.AddBookDetailWindow','Lhb.view.EditBookDetailWindow'],
	refs:[
	      {
	      ref:'BookDetailView',
	      selector:'BookDetailView'}
	      ],  
	
	init:function(){
		var me = this;
		this.control({
			'BookDetailView button[action=add_BookDetail]':{
				click:me.openWindow
			},
			'BookDetailView button[action=edit_BookDetail]':{
				click:me.openEditWindow
			},
			'BookDetailView button[action=delete_BookDetail]':{
				click:me.deleteBookDetail
			},
			'BookDetailView button[action=query_BookDetail]' :{
				click:me.query_BookDetail
			},
			'BookDetailView button[action=back]' :{
				click:me.back
			},
			'AddBookDetailWindow button[action=submit]':{
				click : me.add
			},
			'AddBookDetailWindow button[action=cancel]':{
				click : me.add_cancel
			}
		}
		);
	}, 
	
	openWindow:function(){
		Ext.create('Lhb.view.AddBookDetailWindow').show();
	},
	add_cancel:function(btn){
//		btn.up('AddbookWindow').close();//关闭窗口和隐藏窗口的区别
		btn.up('AddBookDetailWindow').hide();
	},

			
	add:function(btn){
		var me = this;
		var form = btn.up('form').getForm();	
		 if(form.isValid()){
			form.submit({
				url:'./bookdetail/addBookDetail',
				method:'POST',
				waitTitle:'提示',
				waitMsg:'提交ing,请稍等...',
				success:function(form,action){   //不添加form,action会如何？
					Ext.Msg.alert('提示',"添加成功！");
					btn.up('AddBookDetailWindow').close();
					me.getBookDetailView().getStore().reload();
				},
				failure:function(form,action){
					Ext.Msg.alert('提示',action.result.msg);//action.result.msg
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
			var editWin = Ext.create('Lhb.view.EditBookDetailWindow',{
				chooseId : selectedID[0].get('id'),
				fatherWindow : gridStore
			});
			
			editWin.show();
		}
	},
	
	deleteBookDetail:function(btn){
		var me = this;
		var records = me.getBookDetailView().getSelectionModel().getSelection();
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
						url:'./bookdetail/deleteBookDetail',
						method:'POST',
						params: {
						        id: ids
						    },
						    success: function(){
						    	Ext.Msg.alert('提示','删除成功!');
						    	Ext.Array.each(records,function(record){
						    		me.getBookDetailView().getStore().remove(record);
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
	
	query_BookDetail:function(btn){
		 var me = this;	        	        
	        var textrecords = btn.up('toolbar').down('textfield').getValue();
	        var querytype = btn.up('toolbar').down('combobox').getValue();
//	        console.log(textrecords);
//	        console.log(querytype);
	        me.getBookDetailView().getStore().reload({params:{text:textrecords,query_type:querytype}
	        
	        });
	    },
			 
    back:function(btn){
        var me = this;
//        var querytype = btn.up('toolbar').down('combobox').setValue();
        var textrecords = btn.up('toolbar').down('textfield').setValue(); 
//        me.getBookDetailView().getStore().getProxy().extraParams.isbn=null;   
        me.getBookDetailView().getStore().reload({params:{}});       
//		me.getBookDetailView().getStore().reload();
    }

});