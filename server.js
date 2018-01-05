var express = require("express");
var http = require("http");
var port = 8080;
var app = express();
var mysql = require('mysql');

app.use(express.static(__dirname + "/content"));
app.use("/tourmenu", express.static(__dirname + "/tourmenu"));

const options = {
	user: 'root',
	password: "root",
	database: 'tours',
	multipleStatements: true
	//socketPath: '/cloudsql/my-second-project-191112:europe-west1:outofskindb'
};

const pool = mysql.createPool(options);

function createTable() {
	pool.getConnection((err, connection) => {
		if (err) {
			console.log("Getting connection from pool failed with error " + JSON.stringify(err, null, 2));
		}
		else {
			console.log("Got connection");
			connection.query(
				`USE \`oldsite\`;
				CREATE TABLE IF NOT EXISTS \`oldsite\`.\`tours\` (
				  \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
				  \`eventName\` VARCHAR(255) NULL,
				  \`city\` VARCHAR(255) NULL,
				  \`beginDate\` DATE NULL,
				  \`endDate\` DATE NULL,
				  \`beginTime\` TIME NULL,
				  \`endTime\` TIME NULL,
				  \`location\` VARCHAR(255) NULL,
				PRIMARY KEY (\`id\`));`,
				(err) => {
					if (err) {
						throw err;
					}
					console.log('Successfully created schema');
				}
			);
			connection.release();
		}
	});
}

app.get("/addTour", (req, res) => {
	console.log("Received request to add tour");
	console.log(req.query);
	tourDB.addTour(req.query)
		.then(() => {
			console.log("Added tour");
			res.end();
		}).catch((error) => {
			console.log("Adding tour errored with error " + JSON.stringify(error, null, 2));
			res.end(JSON.stringify({
				error: error
			}));
	});
});

app.get("/fetchTours", (req, res) => {
	console.log("Received request to show tours");
	tourDB.fetchTours()
		.then((tours) => {
			res.end(JSON.stringify({
				tours
			}));
		}).catch((error) => {
			console.log("caught error fetching tours");
			res.end(JSON.stringify({
				error: error
			}));
	});
});

app.get("/deleteTour", (req, res) => {
	console.log("Received request to delete tour");
	console.log(req.query);
	const id = req.query.id;
	tourDB.deleteTour(id)
		.then(() => {
			res.end();
		}).catch((error) => {
			res.end(JSON.stringify({
				error
			}));
	});
});

http.createServer(app).listen(port);
console.log("listening at port " + port);
