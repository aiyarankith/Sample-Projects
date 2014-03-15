
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
var mysql_cart = require("./mysql_cart");
var allcookies = [];

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
app.use(express.cookieParser());
app.use(express.session({secret : 'asxcfrgth'}));
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
	name : ""
	});
});

app.get('/index.ejs', function(req, res){
	res.render('index.ejs', {
	title: "Shopping Website",
	name : req.session.login
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
		if(err){
			throw err;
		}else{
			//Setting Session Variable
			req.session.login = results[0].F_NAME;
			req.session.id = results[0].ID;
			console.log("Name :: "+results[0].F_NAME);
			
			
			console.log("Session :"+req.session.login);
			console.log("Session id :"+req.session.id);

			res.render('index.ejs',
					{title : "Shopping Website",
					name : req.session.login});
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

//**************Electronics and Computer Page**********

app.get('/computers.ejs', function (req, res) {
	
	//Receiving Cookies set at Add to Cart
	
	console.log("Cookies Set: "+req.cookies.Product_Name);
	//console.log("Cookies Set: "+req.cookies.Product_Price);
	//console.log("Cookies Set: "+req.cookies.Product_Qty);
	
	//Cookie Array
	if(req.cookies.Product_Name !== null){
	allcookies.push(req.cookies.Product_Name);
	res.clearCookie('Product_Name', {path: '/'});
	}
	console.log("All Cookie : "+allcookies);
	if(allcookies[0] === undefined){
		allcookies = [];
	}
	
	mysql_registration.product(function(err,results){
		if(err){
			throw err;
		}else{
			console.log("products :"+results);
			//console.log("Name :: "+results[0].F_NAME);

			res.render('computers.ejs',
					{title : "Shopping Website",
					name : req.session.login,
					product1_name: results[0].PRODUCT_NAME,
					product1_desc: results[0].DESCRIPTION,
					product1_price: results[0].PRICE,
					product1_qty: results[0].QTY,
					product3_name: results[2].PRODUCT_NAME,
					product3_desc: results[2].DESCRIPTION,
					product3_price: results[2].PRICE,
					product3_qty: results[2].QTY});
		}
	});
});
//**********************Electronics and Computer Page Ends**********

//**********************Cart Page***********************************
app.get('/cart.ejs', function(req, res){
	console.log(allcookies);
	res.render('cart.ejs', {
	title: "Shopping Website",
	name: req.session.name,
	cookies: allcookies});
});
//**********************Cart Page Ends***********************************

//**********************Add to Cart Button***********************************

app.post('/add_to_cart', function(req, res){
	console.log("Param object: "+req.param('submitType'));
	var QTY = 1;
	var allcookies;
	var cookie_array = {};
	mysql_cart.add_to_cart(function(err,results){
		if(err){
			throw err;
		}else{
			console.log("products :"+results);
			console.log("Name at add to cart:: "+results[0].PRODUCT_NAME);
			console.log("Session Name :: "+req.session.login);
			
			//Setting Products in Cookies
			var values = [results[0].PRODUCT_NAME, results[0].PRICE, results[0].PRODUCT_ID, QTY];
			res.cookie("Product_Name", values, { maxAge: 900000, httpOnly: false });
			//res.cookie("Product_Price", results[0].PRICE, { maxAge: 900000, httpOnly: false });
			//res.cookie("Product_Qty", QTY, { maxAge: 900000, httpOnly: false });
			//res.cookie("Product_Id", results[0].PRODUCT_ID, { maxAge: 900000, httpOnly: false });
			
			console.log("all cookies : "+cookie_array);
			res.redirect("computers.ejs");
		}
	},req.param('submitType'));
});

//********************Add to Cart Button Ends*******************************

//********************Sign Out Page********************************
app.get('/sign_out', function(req, res){
	req.session.login = null;
	allcookies = [];
	res.render('index.ejs', {
	title: "Shopping Website",
	name: req.session.login});
});
//*******************Sign Out page Ends***************************

app.get('/products.ejs', function(req, res){
	res.render('products.ejs', {
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
