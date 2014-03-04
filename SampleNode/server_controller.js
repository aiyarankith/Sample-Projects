var application_root = __dirname,
    express = require("express"),
    path = require("path"),
	ejs = require("ejs");
var app = express();
var request = require("request");
var mysql = require("./mysql_connect");

var title = 'EJS template with Node.JS';
var data = 'Data from node';

app.configure(function () {
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(application_root, "public")));
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/login', function (req, res) {
	ejs.renderFile('login.ejs',
			{title : title, data : data},
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
	if(!req.body.hasOwnProperty('userName') ||!req.body.hasOwnProperty('password')) {
		res.statusCode = 400;
		return res.send('Error 400: Post syntax incorrect.');
	}
	
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}else{
			ejs.renderFile('result.ejs',
					{name : results[0].name},
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
	},req.param('userName'),req.param('password'));
	
});

app.listen(4242);