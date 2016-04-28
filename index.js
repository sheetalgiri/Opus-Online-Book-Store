'use strict';

var express = require('express'),
	routes = require('./app/routes/routes.js'),
	mysql=require('mysql'),
	passport =require('passport'), 
    LocalStrategy = require('passport-local').Strategy,
    crypto = require('crypto'),
	flash    = require('connect-flash'),
	morgan       = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser   = require('body-parser'),
	session      = require('express-session'),
	configDB = require('./config/database.js'),
	configPP = require('./config/passport.js');
    
var connection=mysql.createConnection(configDB);
// set up our express application
var app = express();
app.set('view engine', 'ejs'); // set up ejs for templating
app.use(morgan('dev')); // log every request to the console

app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({
  extended: true
})); 

connection.connect(function(err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}
	console.log('connected to mysql server as id ' + connection.threadId);
	app.use('/img',express.static('public/img'));
	app.use('/',express.static('public'));
	app.use('/controllers',express.static('app/controllers'));

	routes(app,connection);

	app.listen(3000, function () {
	    console.log('Listening on port 3000...');
	});
});
