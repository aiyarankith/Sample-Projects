/**
 * New node file
 */

function connect() {
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '13111990',
  port: '3306',
  database: 'demo'
});
 
connection.connect();

var sql = 'CREATE TABLE MAN(id int,name varchar(20))';

connection.query(sql, function(err, res) {
	if(err){
		console.log("ERROR: " + err.message);
	}else{
		console.log("SQL DB CONNECTED AND TABLE CREATED");
	}
	
	 
});
}

function insertAndQuery(){
var mysql      = require('mysql');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '13111990',
	port: '3306',
	database: 'demo'
});
	 
	connection.connect();
	var sql = 'INSERT INTO MAN VALUES(2,"Ankith Aiyar")';
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
exports.connect = connect;
exports.insertAndQuery = insertAndQuery;