//var http = require('http');

//http.createServer(function handler(req, res) {
//    res.writeHead(200, {'Content-Type': 'text/html'});
//    res.write("<h1 style='color:red'>HELLO WORLD</h1>");
//    res.end();
//}).listen(1337, '127.0.0.1');
var mysql = require("./mysql_connect_demo");
//mysql.connect();
mysql.insertAndQuery();
console.log('Server running at http://127.0.0.1:1337/');
