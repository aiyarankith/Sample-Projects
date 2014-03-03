
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var ejs = require("ejs");
var request = require("request");


var app = express();

//Random Number Generator
var random_number = require("./prime_logic");

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

var title = 'EJS Simple Math Solver';
var data = 'Data from node';

app.get('/mathsolver', function (req, res) {
	
	//Random Number Generation
	var randomnumber=Math.floor(Math.random()*1001);
	console.log("Generated Random Number: " +randomnumber);

	ejs.renderFile('MathSolver.ejs',
			{title : title, data : data, random : randomnumber},
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

//Calculation
app.post('/calculate', function (req, res) {
	random_number.fetchData(function(results){
		//Get Results from prime_logic.js
		console.log("Prime Results :" +results);
			
		var title = "EJS Output";
		
		ejs.renderFile('mathsolver_result.ejs',
				{title : title, primes : results},
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
	},req.param('number'));
});
	
app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});