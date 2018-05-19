import * as express from "express";
const app = express();
import tourRoutes from "./DataRoutes/TourRoutes";
import bioRoutes from "./DataRoutes/BioRoutes";
import routes from "./Routes";
import Logger from "./Logs/Logger";
const port = 3000;

// to support JSON-encoded bodies
app.use(express.json());
// to support URL-encoded bodiesW
app.use(express.urlencoded({extended: true}));
app.use(routes);
app.use("/tourData", tourRoutes);
app.use("/bioData", bioRoutes);
app.use(express.static(__dirname + "/client/site/"));
app.use(express.static(__dirname + "/client/menu/"));

app.listen(port);
Logger.info("Server started on port " + port);
