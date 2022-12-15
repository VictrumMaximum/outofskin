import MusicDatabase from "../Databases/MusicDatabase";
const fileName = "music.json";
const db = new MusicDatabase(fileName);

import * as express from "express";
import Logger from "../Logs/Logger";
const router = express.Router();

router.get("/", (req, res) => {
    Logger.debug("Fetch music");
    db.fetch()
        .then((music) => {
            res.end(JSON.stringify({data: music}));
        }).catch((error) => {handleError(error, res)});
});

router.patch("/", (req, res) => {
	Logger.debug("Update music");
	const newMusic = req.body;
	db.update(req.body)
		.then(() => {Logger.debug("done updating"); res.end("{}");})
		.catch((error) => {handleError(error, res)});
});

const handleError =  (error, response) => {
    Logger.error(JSON.stringify(error, null, 2));
	response.end(JSON.stringify({error}));
};

export default router;
