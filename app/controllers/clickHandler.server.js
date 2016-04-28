'use strict';

function clickHandler(connection){
	
	this.getClicks=function(req,res){
		connection.query('SELECT * FROM clicks ',function(err,results,fields){
			if(err){
				throw err;
			}

			if(results.length!=0){
				res.json(results[0]);
			}
			else{
				connection.query('INSERT INTO clicks SET clicks=0');
				connection.query('SELECT * FROM clicks ',function(err,results,fields){
					if(err){
						throw err;
						console.log(err);
					}
					
					res.json(record[0]);
				});
			}
		}); 
	}

	this.addClick=function(req,res){
		connection.query('UPDATE clicks SET clicks=clicks+1');
		connection.query('SELECT * FROM clicks ',function(err,result){
			if(err)
				throw err;
			res.json(result[0]);
		});
	}

	this.resetClicks=function(req,res){
		connection.query('UPDATE clicks SET clicks=0');
		connection.query('SELECT * FROM clicks ',function(err,result){
			if(err)
				throw err;
			res.json(result[0]);
		});
	}
}

module.exports=clickHandler; 