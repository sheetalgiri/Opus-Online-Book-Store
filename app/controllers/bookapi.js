 'use strict';
function bookapi(connection){
    
    var executeQuery=function(sqlString,valueArray,callback){
        connection.query({sql:sqlString,values:valueArray}, function(err, result) {
            if (err)
                throw err;
            else
                if(result.length>0)
                    callback(result);
                else
                    callback(false);
    });
    }
    
	var executeTransaction=function(sqlString,valueArray,callback){
        connection.beginTransaction(function(err) {
        if (err) { throw err; }
        connection.query({sql:sqlString,values:valueArray}, function(err, result) {
         if (err) {
                return connection.rollback(function() {
                throw err;
                });
            }  
            connection.commit(function(err) {
                if (err) {
                return connection.rollback(function() {
                    throw err;
                });
                }
                callback(result);
            });
            });
        });
     }

    //order related
	this.addOrder=function(req,res){
        executeTransaction("INSERT INTO orders SET user_id=?,book_id=?",[req.body.userId,req.body.bookId],function(result){
            if(result)
                res.send(result.insertId);
            else
                res.send(false);
        });
    }
    
    this.deleteOrder=function(req,res){
        executeTransaction("DELETE FROM orders WHERE id=?",[req.params.orderId],function(result){
            if(result)
                res.send(result);
            else
                res.send(false);
        });
    }
    
    this.getOrder=function(req,res){
        executeQuery("SELECT * FROM orders WHERE id=?",[req.params.orderId],function(result){
            if(result)
                res.send(result[0]);
            else
                res.send(false);
        });    
    }    
    
    this.changeOrderStatus=function(req,res){
        executeTransaction("UPDATE orders SET status=? WHERE id=?",[req.body.status,req.body.orderId],function(result){
            if(result)
                res.send(result[0]);
            else
                res.send(false);
        });        
    }
    
    this.orderList=function(req,res){
        var sql,val;
        if(req.query.status && req.query.userId){
            sql="SELECT * FROM orders WHERE status=? AND user_id=?";
            val=[req.query.status,req.query.userId]; 
        }
        else if(req.query.status)
        {   sql="SELECT * FROM orders WHERE status=?";
            val=[req.query.status];
        }
        else if(req.query.userId)
        {            
            sql="SELECT * FROM orders WHERE user_id=?";
            val=[req.query.userId];
        }
        else
        {
            sql="SELECT * FROM orders";
            val=[];
        }
        executeQuery(sql,val,function(result){
            if(result)
                res.send(result);
            else
                res.send(false);
        })
    }
    
    //author related api controllers
    this.addAuthor=function(req,res){
        executeTransaction("INSERT INTO authors SET author=?",[req.body.name],function(result){
            if(result)
                res.send(result.insertId);
            else
                res.send(false);
        });
    }
    
    this.deleteAuthor=function(req,res){
        executeTransaction("DELETE FROM authors WHERE id=?",[req.params.id],function(result){
            if(result)
                res.send(result[0]);
            else
                res.send(false);
        });
    }
    
    this.updateAuthor=function(req,res){
        executeTransaction("UPDATE authors set author_name=? WHERE id=?",[req.body.name,req.body.id],function(result){
            if(result)
                res.send(result[0]);
            else
                res.send(false);
        });    
    }
    
    this.getAuthor=function(req,res){
        executeQuery("SELECT author_name FROM authors WHERE id=?",[req.params.id],function(result){
            if(result)
                res.send(result[0]);
            else
                res.send(false);            
        });
    }
    
    //genre related api controllers
    this.addGenre=function(req,res){
        executeTransaction("INSERT INTO genre SET name=?",[req.body.name],function(result){
            if(result)
                res.send(result.insertId);
            else
                res.send(false);
        });
    }
    
    this.deleteGenre=function(req,res){
        executeTransaction("DELETE FROM genre WHERE id=?",[req.params.id],function(result){
            if(result)
                res.send(result[0]);
            else
                res.send(false);
        });
    }
    
    this.updateGenre=function(req,res){
        executeTransaction("UPDATE genre set name=? WHERE id=?",[req.body.name,req.body.id],function(result){
            if(result)
                res.send(result[0]);
            else
                res.send(false);
        });    
    }
    
    this.getGenre=function(req,res){
        executeQuery("SELECT name FROM genre WHERE id=?",[req.params.id],function(result){
            if(result)
                res.send(result[0]);
            else
                res.send(false);
        });
    }
    
    //search for tags
    this.authorSearch=function(req,res){
        executeQuery("SELECT id,author AS 'text' FROM authors WHERE MATCH(author) AGAINST( ? )",[req.query.name],function(result){
            if(result)
                res.send(result);
            else
                res.send(false);
        });
    }
    
    this.genreSearch=function(req,res){
        executeQuery("SELECT id,name AS 'text' FROM genre WHERE MATCH(name) AGAINST( ? )",[req.query.name],function(result){
            if(result)
                res.send(result);
            else
                res.send(false);
        });
    }
    
    //book related
    
    this.addBook=function(req,res){
        var i;
        var book={};
        book=req.body;
        executeTransaction("INSERT INTO books SET name=?,description=?",[book.name,book.description],function(result){
        if(result)
        {
            book.id=result.insertId;
            for (i in book.Authors)
            executeTransaction("INSERT INTO book_author SET book_id= ? ,author_id= ?",[book.id,book.Authors[i].id],function(result){
                for (i in book.Genre)
                    executeTransaction("INSERT INTO book_genre SET book_id= ? ,genre_id= ? ",[book.id,book.Genre[i].id],function(result){
                        return("successful");
                    });
            });
        }
        else
            res.send(false);        
        });
    }
    
    this.deleteBook=function(req,res){
        executeTransaction("DELETE FROM books WHERE id=?",[req.params.id],function(result){
            if(result)
                return result;
            else
                return (false);    
        }); 
    }
    
    this.updateBook=function(book,res){
        //do this
    }
    
    this.getBookList=function(req,res){
		executeQuery("SELECT id,name from books",[],function(result){
            if(result)
                res.send(result);
            else
                res.send(false);
        });
	}

	this.getBookQuotes=function(req,res){
		executeQuery("SELECT * FROM quotes WHERE book_id=?",[req.params.id],function(result){
            if(result)
                res.send(result);
            else
                res.send(false);
        });
	}

	this.getBookDetails=function(req,res){
		var info=[];
		connection.query({
			sql:"SELECT name,description FROM books WHERE books.id=?",
			values:[req.params.id]
		},
		function (err,results) {
			if(err) throw err;

			if(results.length>0){
				info.push(results[0]);
				connection.query({
					sql:"SELECT author_id,author FROM book_author,authors WHERE book_author.book_id=? AND book_author.author_id=authors.id",
					values:[req.params.id]
				},
				function(err,results){
					if(err) throw err;

					if(results.length>0){
						info.push(results);
						connection.query({
							sql:"SELECT genre.name FROM book_genre,genre WHERE book_genre.book_id=? AND book_genre.genre_id=genre.id",
							values:[req.params.id]
						},

						function(err,results){
							if(err) throw err;

							if(results.length>0){
								info.push(results);
								res.send(info);
							}
						});
					}}
				)
			}
		}
		)
	}
}

module.exports=bookapi;
