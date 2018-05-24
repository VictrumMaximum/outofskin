import SubscribersDatabase from "../Databases/SubscribersDatabase";
const fileName = "subscribers.json";
const db = new SubscribersDatabase(fileName);

import * as express from "express";
import Logger from "../Logs/Logger";
const router = express.Router();

router.get("/", (req, res) => {
    Logger.debug("Fetch subscribers");
    db.fetch()
        .then((bio) => {
            res.end(JSON.stringify({bio}));
        }).catch((error) => {handleError(error, res)});
});

router.post("/", (req, res) => {
	Logger.debug("Add subscriber");
    // const newBio = req.body.newBio;
    // subscribersDB.add(newBio)
		// .then(() => {Logger.debug("done updating"); res.end("{}");})
		// .catch((error) => {handleError(error, res)});
});

const handleError =  (error, response) => {
    Logger.error(JSON.stringify(error, null, 2));
	response.end(JSON.stringify({error}));
};

export default router;
