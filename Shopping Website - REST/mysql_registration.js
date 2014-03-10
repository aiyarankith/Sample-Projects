/**
 * New node file
 */
//Connection Pooling
var mysql      = require('mysql');
var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '13111990',
  database: 'amazon',
  connectionLimit: 10
});

//Insert into Registration
function insert(f_name,l_name,email,pwd){
var mysql      = require('mysql');

		console.log("First Name: " + f_name + "Last Name: " + l_name + "Password: " +pwd + "email: "+email);
		
		//var sql_insert = 'INSERT INTO REGISTRATION VALUES(DEFAULT,f_name,l_name,email,pwd)';
		var sql = ["INSERT INTO REGISTRATION SET", " f_name=?", ",l_name=?", ",email=?",",pwd=?"].join('');
		
		var inserts = [f_name, l_name, email, pwd, insert];
		//Get Pool
		pool.getConnection(function(err, connection) {
	    if(err) return console.error(err);
	    connection.query(sql, inserts, function(err, results) {
	    	//Release Connection
	    	connection.release();
	    	if(err) return console.error(err);
	    });
	});
}

//Login
function signin(callback,email,pwd){
	var mysql      = require('mysql');
	console.log("Password: " +pwd + "email: "+email);
	
		var sql = ["SELECT * FROM REGISTRATION where email=? and pwd=?"].join('');
		var selects = [email,pwd,signin];
		
		pool.getConnection(function(err, connection) {
		    if(err) return console.error(err);
		    connection.query(sql, selects, function(err, rows, fields) {
		    	if(rows.length!==0){
					console.log("DATA : "+JSON.stringify(rows));
					callback(err, JSON.stringify(rows));
				}
		    	//Release Connection
		    	connection.release();
		    	if(err) return console.error(err);
		    });
		});
}

exports.insert = insert;
exports.signin = signin;