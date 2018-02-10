import tourDB from "./TourDatabase";
import * as express from "express";
const url = require('url');
const app = express();
const router = express.Router();

router.get("/", (req, res) => {
	console.log("Received request to show tours");
	console.log(req.query);
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
	console.log(req.body);
	tourDB.add(req.body)
		.then(() => {res.end("{}");})
		.catch((error) => {
			console.log("Adding tour errored with error " + JSON.stringify(error, null, 2));
			res.end(JSON.stringify({error: error}));
		});
});

router.delete("/", (req, res) => {
	console.log("Received request to delete tour");
	const id = req.query.id;
	tourDB.remove(id)
		.then(() => {res.end("{}");})
		.catch((error) => {
			console.log("Deleting tour errored with error " + JSON.stringify(error, null, 2));
			res.end(JSON.stringify({error: error}));
	});
});

router.patch("/", (req, res) => {
	res.send("patch");
});

export default router;
