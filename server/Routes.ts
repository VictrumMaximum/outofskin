import * as express from "express";
import Logger from "./Logs/Logger";
const router = express.Router();

const sendSiteIndex = (req, res) => {
    Logger.debug((req.headers['x-forwarded-for'] || req.connection.remoteAddress) + "," + req.headers['user-agent']);
    res.sendFile(__dirname + "/client/site/index.html");
};

router.get("/", sendSiteIndex);
router.get("/bio", sendSiteIndex);
router.get("/music", sendSiteIndex);
router.get("/press", sendSiteIndex);
router.get("/contact", sendSiteIndex);

export default router;
