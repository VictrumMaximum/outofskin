import PressDatabase from "../Databases/PressDatabase";
const fileName = "press.json";
const db = new PressDatabase(fileName);

import * as express from "express";
import Logger from "../Logs/Logger";
const router = express.Router();

router.get("/", (req, res) => {
    Logger.debug("Fetch quotes");
    db.fetch()
        .then((quotes) => {
            res.end(JSON.stringify({data: quotes}));
        }).catch((error) => {handleError(error, res)});
});

router.patch("/", (req, res) => {
	Logger.debug("Update quotes");
	db.update(req.body)
		.then(() => {Logger.debug("done updating"); res.end("{}");})
		.catch((error) => {handleError(error, res)});
});

const handleError =  (error, response) => {
    Logger.error(JSON.stringify(error, null, 2));
	response.end(JSON.stringify({error}));
};

export default router;
