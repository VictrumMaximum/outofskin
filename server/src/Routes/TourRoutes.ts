import tourDB from "../Databases/TourDatabase";
import * as express from "express";
import Logger from "../Logs/Logger";
const router = express.Router();

router.get("/", (req, res) => {
    Logger.debug("Received request to show tours");
    tourDB.fetchAll()
        .then((tours) => {
            res.end(JSON.stringify({data: tours}));
        }).catch((error) => {handleError(error, res)});
});

router.post("/", (req, res) => {
    Logger.debug("Received request to add tour");
	const tour = req.body;
	tourDB.add(tour)
		.then(() => {res.end("{}")})
		.catch((error) => {handleError(error, res)});
});

router.delete("/", (req, res) => {
    Logger.debug("Received request to delete tour");
	const id = req.query.id;
	tourDB.remove(id)
		.then(() => {console.log("returning delete request");res.end("{}")})
		.catch((error) => {handleError(error, res)});
});

router.patch("/", (req, res) => {
	Logger.debug("Received request to update tour");
	const id = req.body.id;
	const updates = req.body.updates;
	tourDB.update(id, updates)
		.then(() => {res.end("{}");})
		.catch((error) => {handleError(error, res)});
});

const handleError =  (error, response) => {
    Logger.error(JSON.stringify(error, null, 2));
	response.end(JSON.stringify({error}));
};

export default router;
