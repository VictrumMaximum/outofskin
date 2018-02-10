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
		}).catch((error) => {handleError(error, res)});
});

router.post("/", (req, res) => {
	console.log("Received request to add tour");
	const tour = req.body;
	tourDB.add(tour)
		.then(() => {res.end("{}")})
		.catch((error) => {handleError(error, res)});
});

router.delete("/", (req, res) => {
	console.log("Received request to delete tour");
	const id = req.query.id;
	tourDB.remove(id)
		.then(() => {res.end("{}")})
		.catch((error) => {handleError(error, res)});
});

router.patch("/", (req, res) => {
	console.log("Received request to update tour");
	const id = req.body.id;
	const updates = req.body.updates;
	tourDB.update(id, updates)
		.then(() => {res.end("{}");})
		.catch((error) => {handleError(error, res)});
});

const handleError =  (error, response) => {
	console.log(JSON.stringify(error, null, 2));
	response.end(JSON.stringify({error}));
};

export default router;
