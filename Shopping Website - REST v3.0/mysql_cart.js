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

exports.add_to_cart = add_to_cart;