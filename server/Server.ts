import * as express from "express";
import * as dataRoutes from "./DataRouters/dataRoutes";
import {resolve} from "path";
import "./env";
import tourRouter from "./DataRouters/TourRouter";
import bioRouter from "./DataRouters/BioRouter";
import subscribersRouter from "./DataRouters/SubscribersRouter";
import musicRouter from "./DataRouters/MusicRouter";
import pressRouter from "./DataRouters/PressRouter";
import Logger from "./Logs/Logger";

const app = express();
const port = process.env.PORT;

// to support JSON-encoded bodies
app.use(express.json());
// to support URL-encoded bodiesW
app.use(express.urlencoded({extended: true}));
app.use(dataRoutes.tourDataRoute, tourRouter);
app.use(dataRoutes.bioDataRoute, bioRouter);
app.use(dataRoutes.subscribersDataRoute, subscribersRouter);
app.use(dataRoutes.musicDataRoute, musicRouter);
app.use(dataRoutes.pressDataRoute, pressRouter);

// for ssl certificate
app.use('/.well-known', express.static(resolve(__dirname + '/../.well-known/')));

app.use("/menu", express.static(__dirname + "/../../client2/menuBuild/"));
// for static files except index.html
app.use(express.static(resolve(__dirname + '/../../client2/build/')));
// any other route should return index.html (specific route is handled by react router)
app.get('/*', (req, res): void => {res.sendFile(resolve(__dirname + '/../../client2/build/index.html'))});

app.listen(port);
Logger.info("Server started on port " + port);
