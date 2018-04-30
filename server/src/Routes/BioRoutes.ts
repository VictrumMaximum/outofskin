import bioDB from "../Databases/BioDatabase";
import * as express from "express";
import Logger from "../Logs/Logger";
const router = express.Router();

router.get("/", (req, res) => {
    Logger.debug("Received request to show bio");
    bioDB.fetch()
        .then((bio) => {
            res.end(JSON.stringify({bio}));
        }).catch((error) => {handleError(error, res)});
});

router.patch("/", (req, res) => {
	Logger.debug("Received request to update bio");
	const newBio = req.body.newBio;
	bioDB.update(newBio)
		.then(() => {Logger.debug("done updating"); res.end("{}");})
		.catch((error) => {handleError(error, res)});
});

const handleError =  (error, response) => {
    Logger.error(JSON.stringify(error, null, 2));
	response.end(JSON.stringify({error}));
};

export default router;
