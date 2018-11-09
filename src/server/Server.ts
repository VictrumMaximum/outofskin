import * as express from "express";
const app = express();
import tourRouter from "./DataRouters/TourRouter";
import bioRouter from "./DataRouters/BioRouter";
import subscribersRouter from "./DataRouters/SubscribersRouter";
import musicRouter from "./DataRouters/MusicRouter";
import pressRouter from "./DataRouters/PressRouter";
import mainRouter from "./Routes";
import Logger from "./Logs/Logger";
const port = 8080;

import {start} from "./IPUpdater";
start();

import * as dataRoutes from "./DataRouters/dataRoutes";

// to support JSON-encoded bodies
app.use(express.json());
// to support URL-encoded bodiesW
app.use(express.urlencoded({extended: true}));
app.use(mainRouter);
app.use(dataRoutes.tourDataRoute, tourRouter);
app.use(dataRoutes.bioDataRoute, bioRouter);
app.use(dataRoutes.subscribersDataRoute, subscribersRouter);
app.use(dataRoutes.musicDataRoute, musicRouter);
app.use(dataRoutes.pressDataRoute, pressRouter);
app.use("/", express.static(__dirname + "/client/site/"));
app.use("/menu", express.static(__dirname + "/client/menu/"));

app.listen(port);
Logger.info("Server started on port " + port);
