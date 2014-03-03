/**
 * New node file
 */
function insert(callback,f_name,l_name,email,pwd){
var mysql      = require('mysql');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '13111990',
	port: '3306',
	database: 'demo'
});
	connection.connect();
	var sql = 'INSERT INTO PERSON VALUES(1,"PRADYUMNA")';
	connection.query(sql, function(err, results) {
		if (err) {
            console.log("ERROR: " + err.message);
        }
		console.log(results);
//		sql = 'SELECT * FROM USER';
//		connection.query(sql, function(err, rows, fields){
//				if(rows.length!==0){
//					console.log("DATA: " + rows[0].data.toString());
//				}
//		});
		 
	});
}

function fetchData(callback,f_name,l_name,email,pwd){
	var mysql      = require('mysql');
	console.log("First Name: " + f_name + "Last Name: " + l_name + "Password: " +pwd + "email: "+email);
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '13111990',
		port: '3306',
		database: 'login_demo'
	});
	
		var sql_insert = 'INSERT INTO login_demo VALUES()';
		connection.query(sql_insert, function(err, results) {
		if (err) {
            console.log("ERROR: " + err.message);
        }
		console.log(results);
		});
		
		connection.connect();
		var sql = 'SELECT * FROM login_demo';
		connection.query(sql, function(err, rows, fields){
				if(rows.length!==0){
					console.log("DATA : "+JSON.stringify(rows));
					callback(err, rows);
				}
		});
}

exports.insertAndQuery = insert;
exports.fetchData = fetchData;