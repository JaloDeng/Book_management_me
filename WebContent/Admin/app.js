Ext.Loader.setConfig({
	enabled : true
	
});

Ext.require([
      ]);

Ext.application({
	name:'Lhb',
	appFolder:'Admin/lhb',
	autoCreateViewport:true,
	controllers:['MenuController','BookController','TypeController','BookDetailController'],//,'BookTypeController'
	
	launch:function(){
		
	}
	
});