/*passport.use(new LocalStrategy(
  function(email, password, done) {
    connection.query('SELECT * FROM users WHERE email=? LIMIT 1',[email],function(err,user){
      if (err) { return done(err); }
      if (user.length==0) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      if (!user[0].password!=password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user[0]);
    });
  }
));

/*var LocalStrategy = require('passport-local').Strategy;

module.exports=function(passport,connection){
	passport.use('local-login',new LocalStrategy(
	function(req,username,password,done){

		connection.query('SELECT * FROM users WHERE username=? LIMIT 1',[username],function(err,user){
			if(err)
				throw err;
			if(user.length==0){
				return done(null,false,req.flash('loginMessage','Incorrect Username'))
			}	

			if(user[0].password!=password){
				return done(null,false,req.flash('loginMessage','Incorrect password'))	
			}
			
			return done(null,user[0]);			
		});
	}
	));

	passport.use('local-signup',new LocalStrategy({
		usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
	function(req,email,password,done){

		connection.query('SELECT * FROM users WHERE username=? LIMIT 1',[email],function(err,user){
			if(err){
				throw err;
			}
			if(user.length!=0){
				return done(null,false,req.flash('signupMessage','Email has already been registered'))
			}	

			connection.query('INSERT INTO users SET ?',{username:email,password:password});
			connection.query('SELECT * FROM users WHERE username=? LIMIT 1',[email],function(err,user){
				if(err){
					throw err;
				}
				
				return done(null,user[0]);
			});
					
		});
	}
	));

	passport.serializeUser(function(user, done) {
	  done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
	  connection.query('SELECT password FROM users WHERE id=? LIMIT 1',[id],function(err, user) {
	    done(err, user[0]);
	  });
	});	
}*/