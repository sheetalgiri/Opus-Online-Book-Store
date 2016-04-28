'use strict';

var Bookapi=require(process.cwd()+'/app/controllers/bookapi.js');

module.exports=function(app,connection){

	var bookapi=new Bookapi(connection);

	app.route('/')
		.get(function (req, res) {
	    	res.sendFile(process.cwd()+'/public/index.html');//where cwd gives current working directory
		});

	app.route('/api/books')
		.get(bookapi.getBookList);
     
	app.route('/api/book/:id')
		.get(bookapi.getBookDetails);
        
    app.route('/api/book')     
        .post(bookapi.addBook);
        
    app.route('/api/author')
        .post(bookapi.addAuthor);
    
    app.route('/api/author/:id')
        .get(bookapi.getAuthor)
        .put(bookapi.updateAuthor)
        .delete(bookapi.deleteAuthor);
	
    app.route('/api/genre')
        .post(bookapi.addGenre);
    
    app.route('/api/genre/:id')
        .get(bookapi.getGenre)
        .put(bookapi.updateGenre)
        .delete(bookapi.deleteGenre);
    
    app.route('/api/order')
        .post(bookapi.addOrder)
        .put(bookapi.changeOrderStatus);
    
    app.route('/api/order/:id')
        .get(bookapi.getOrder)
        .delete(bookapi.deleteOrder);
        
	app.route('/api/orderlist')
        .get(bookapi.orderList);
        
    app.route('search/author')
		.get(bookapi.authorSearch);
   
   app.route('search/genre')
         .get(bookapi.genreSearch);                
};
