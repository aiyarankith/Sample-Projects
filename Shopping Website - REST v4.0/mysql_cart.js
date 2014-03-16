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

function add_to_cart(callback,cart){
	var mysql      = require('mysql');

	var sql = "SELECT * FROM PRODUCT WHERE PRODUCT_ID = ?";
	
		pool.getConnection(function(err, connection) {
		    if(err) return console.error(err);
		    connection.query(sql, [cart], function(err, rows, fields) {
		    	if(rows.length!==0){
		    		
					console.log("DATA AT CART: "+JSON.stringify(rows));
					console.log("Name at cart :: "+rows[0].PRODUCT_NAME);
					callback(err, rows);
				}
		    	if(err) return console.error(err);
		    	//Release Connection
		    	connection.release();
		    });
		});
}

function transaction(transaction_id, p_id, p_name, p_qty, p_cost){
	var mysql      = require('mysql');

		console.log("Login at cart mysql final: " + p_id + "Password: " +p_name + "quant: "+p_qty);
		
		//var sql_insert = 'INSERT INTO REGISTRATION VALUES(DEFAULT,f_name,l_name,email,pwd)';
		var sql = "INSERT INTO TRANSACTION (TRANSACTION_ID, PRODUCT_ID, PRODUCT_NAME, PRICE, QTY) VALUES (?,?,?,?,?)";
		
		//Get Pool
		pool.getConnection(function(err, connection) {
	    if(err) return console.error(err);
	    connection.query(sql, [transaction_id, p_id, p_name, p_qty, p_cost], function(err, results) {
	    	//Release Connection
	    	connection.release();
	    	if(err) return console.error(err);
	    });
	});
}

function transaction_fetch(callback,transaction_id){
	var mysql      = require('mysql');
	console.log("transaction id: "+transaction_id);
	var sql = "SELECT * FROM TRANSACTION WHERE TRANSACTION_ID = ?";
	
		pool.getConnection(function(err, connection) {
		    if(err) return console.error(err);
		    connection.query(sql, [transaction_id], function(err, rows, fields) {
		    	if(rows.length!==0){
					console.log("Transaction at Cart :: "+JSON.stringify(rows));
					callback(err, rows);
				}
		    	if(err) return console.error(err);
		    	//Release Connection
		    	connection.release();
		    });
		});
}

exports.add_to_cart = add_to_cart;
exports.transaction = transaction;
exports.transaction_fetch = transaction_fetch;