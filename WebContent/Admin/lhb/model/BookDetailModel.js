/**
 * 
 */
Ext.define('Lhb.model.BookDetailModel',{
	extend:'Ext.data.Model',
//	fields:['id','book_name','author','type_id','price','brief'],
//	fields:['id','book_name','author','detail','price','brief']
	fields:['id','bookName','author','title','price','brief','amount','ISBN','creatTime','isLoan']
	
});