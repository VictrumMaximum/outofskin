import SubscribersDatabase from "../Databases/SubscribersDatabase";
const fileName = "subscribers.json";
const db = new SubscribersDatabase(fileName);

import * as express from "express";
import Logger from "../Logs/Logger";
const router = express.Router();

router.get("/", (req, res) => {
    Logger.debug("Fetch subscribers");
    db.fetch()
        .then((subscribers) => {
            res.end(JSON.stringify({data: subscribers}));
        }).catch((error) => {handleError(error, res)});
});

router.post("/", (req, res) => {
	const email = req.body.email;
	Logger.debug("Adding subscriber: " + email);
    db.addSubscriber(email)
		.then(() => {Logger.debug("Subscriber " + email + " added!"); res.end("{}");})
		.catch((error) => {handleError(error, res)});
});

const handleError =  (error, response) => {
    Logger.error(JSON.stringify(error, null, 2));
	response.end(JSON.stringify({error}));
};

export default router;
