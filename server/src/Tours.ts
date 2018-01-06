import tourDB from "./TourDatabase";
import * as express from "express";
const app = express();
const router = express.Router();

router.get("/", (req, res) => {
	console.log("Received request to show tours");
	tourDB.fetchAll()
		.then((tours) => {
			res.end(JSON.stringify({data: tours}));
		}).catch((error) => {
		console.log("Fetching tours errored with error: " + JSON.stringify(error, null, 2));
		res.end(JSON.stringify({error: error}));
	});
});

router.post("/", (req, res) => {
	console.log("Received request to add tour");
	console.log(req.query);
	tourDB.add(req.query)
		.then(() => {res.end();})
		.catch((error) => {
			console.log("Adding tour errored with error " + JSON.stringify(error, null, 2));
			res.end(JSON.stringify({error: error}));
		});
});

router.delete("/", (req, res) => {
	res.send("delete");
});

router.patch("/", (req, res) => {
	res.send("patch");
});

app.get("/addTour", (req, res) => {
	console.log("Received request to add tour");
	console.log(req.query);
	tourDB.add(req.query)
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
	tourDB.fetchAll()
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
	tourDB.remove(id)
		.then(() => {
			res.end();
		}).catch((error) => {
		res.end(JSON.stringify({
			error
		}));
	});
});

export default router;
