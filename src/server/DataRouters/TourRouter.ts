import TourDatabase from "../Databases/TourDatabase";
const fileName = "tours.json";
const db = new TourDatabase(fileName);

import * as express from "express";
import Logger from "../Logs/Logger";
const router = express.Router();

router.get("/", (req, res) => {
    Logger.debug("Fetch tours");
    db.fetch()
        .then((tours) => {
            res.end(JSON.stringify({data: tours}));
        }).catch((error) => {handleError(error, res)});
});

router.post("/", (req, res) => {
    Logger.debug("Add tour");
	const tour = req.body;
	db.addTour(tour)
		.then((id) => {res.end(JSON.stringify({data: id}))})
		.catch((error) => {handleError(error, res)});
});

router.delete("/", (req, res) => {
	const id = req.query.id;
	Logger.debug("Delete tour " + id);
	db.removeTour(id)
		.then(() => {res.end("{}")})
		.catch((error) => {handleError(error, res)});
});

router.patch("/", (req, res) => {
	Logger.debug("Update tour");
	const id = req.body.id;
	const updates = req.body.updates;
	db.updateTour(id, updates)
		.then(() => {res.end("{}");})
		.catch((error) => {handleError(error, res)});
});

const handleError =  (error, response) => {
    Logger.error(JSON.stringify(error, null, 2));
	response.end(JSON.stringify({error}));
};

export default router;
