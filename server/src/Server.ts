import * as express from "express";
const app = express();
const port = 8080;

import TourDatabase from "./TourDatabase";
const tourDB = new TourDatabase({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database : 'oldsite'
});

app.use(express.static(__dirname + "/client/"));

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

app.listen(port);
console.log("Server started on port " + port);
