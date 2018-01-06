const mysql = require('mysql');
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'oldsite'
});
connection.connect();

connection.query("SELECT * FROM tours", function(err) {
		if (err) {
			throw err;
		}
	});

connection.end();
