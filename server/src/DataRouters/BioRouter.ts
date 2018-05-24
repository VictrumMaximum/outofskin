import BioDatabase from "../Databases/BioDatabase";
const fileName = "bio.json";
const db = new BioDatabase(fileName);

import * as express from "express";
import Logger from "../Logs/Logger";
const router = express.Router();

router.get("/", (req, res) => {
    Logger.debug("Received request to show bio");
    db.fetch()
        .then((bio) => {
        	// Logger.debug(bio);
            res.end(JSON.stringify({data: bio}));
        }).catch((error) => {handleError(error, res)});
});

router.patch("/", (req, res) => {
	Logger.debug("Received request to update bio");
	const newBio = req.body.newBio;
	db.update(newBio)
		.then(() => {Logger.debug("done updating"); res.end("{}");})
		.catch((error) => {handleError(error, res)});
});

const handleError =  (error, response) => {
    Logger.error(JSON.stringify(error, null, 2));
	response.end(JSON.stringify({error}));
};

export default router;
