
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var ejs = require("ejs");
var mysql_registration = require("./mysql_registration");
var app = express();

// all environments
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use("/styles", express.static(__dirname + '/public/stylesheets'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.set('view options', {
	sitename: 'Shopping Website',
	myname: 'Ankith'
});

//Home Page
app.get('/', function(req, res){
	res.render('index.ejs', {
	title: "Shopping Website",
	});
});

app.get('/index.ejs', function(req, res){
	res.render('index.ejs', {
	title: "Shopping Website",
	});
});

//*************Sign-In Page****************
app.get('/sign_in.ejs', function(req, res){
	res.render('sign_in.ejs', {
	title: "Shopping Website"},
	function(err, result) {
		// render on success
		if (!err) {
			res.end(result);
		}
		// render or error
		else {
			res.end('An error occurred');
			console.log(err);
		}
	});
});
app.post('/signin', function (req, res) {
	if(!req.body.hasOwnProperty('username') ||!req.body.hasOwnProperty('password')) {
		res.statusCode = 400;
		return res.send('Error 400: Post syntax incorrect.');
	}
	//Function in mysql_registration page
	mysql_registration.signin(function(err,results){
		console.log("Results :"+results);
		if(err){
			throw err;
		}else{
			ejs.renderFile('index.ejs',
					{name : results[1].name},
					function(err, result) {
				// render on success
				if (!err) {
					res.end(result);
				}
				// render or error
				else {
					res.end('An error occurred');
					console.log(err);
				}
			});
		}
	},req.param('username'),req.param('password'));
	
});
//***************Sign_In Page ends**************

//***************Registration Page**************
app.get('/registration.ejs', function(req, res){
	res.render('registration.ejs', {
	title: "Shopping Website"},
	function(err, result) {
		// render on success
		if (!err) {
			res.end(result);
		}
		// render or error
		else {
			res.end('An error occurred');
			console.log(err);
		}
	});
});
app.post('/validate', function (req, res) {
	if(!req.body.hasOwnProperty('f_name') ||!req.body.hasOwnProperty('l_name')||!req.body.hasOwnProperty('email')||!req.body.hasOwnProperty('pwd')||!req.body.hasOwnProperty('r_pwd') ) {
		res.statusCode = 400;
		return res.send('Error 400: Post syntax incorrect.');
	}
	//Insert Values into Registration DB
	mysql_registration.insert(req.param('f_name'),req.param('l_name'),req.param('email'),req.param('pwd'));
	res.redirect('/index.ejs');
});

//**************Registration Page ends**************

app.get('/style-demo.ejs', function(req, res){
	res.render('style-demo.ejs', {
	title: "Shopping Website",
	});
});

app.get('/products.ejs', function(req, res){
	res.render('products.ejs', {
	title: "Shopping Website",
	});
});

app.get('/computers.ejs', function(req, res){
	res.render('computers.ejs', {
	title: "Shopping Website",
	});
});

app.get('/books.ejs', function(req, res){
	res.render('books.ejs', {
	title: "Shopping Website",
	});
});

app.get('/home_tool.ejs', function(req, res){
	res.render('home_tool.ejs', {
	title: "Shopping Website",
	});
});

app.get('/kids.ejs', function(req, res){
	res.render('kids.ejs', {
	title: "Shopping Website",
	});
});

app.get('/clothing.ejs', function(req, res){
	res.render('clothing.ejs', {
	title: "Shopping Website",
	});
});

app.get('/sports.ejs', function(req, res){
	res.render('sports.ejs', {
	title: "Shopping Website",
	});
});
app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
