import * as express from "express";
const app = express();
import tourRoutes from "./Routes/TourRoutes";
import bioRoutes from "./Routes/BioRoutes";
const staticSiteFiles = express.static(__dirname + "/client/site/");
import Logger from "./Logs/Logger";
const port = 3000;

// log visitors
app.use((req, res, next) => {
	Logger.debug((req.headers['x-forwarded-for'] || req.connection.remoteAddress) + "," + req.headers['user-agent']);
	next();
});

// to support JSON-encoded bodies
app.use(express.json());
// to support URL-encoded bodies
app.use(express.urlencoded({extended: true}));
app.use("/tourData", tourRoutes);
app.use("bioData", bioRoutes);
app.use("/", staticSiteFiles);
app.use("/bio", staticSiteFiles);
app.use("/music", staticSiteFiles);
app.use("/contact", staticSiteFiles);
app.use("/press", staticSiteFiles);
app.use("/25oktoberwouterdetrex", express.static(__dirname + "/client/menu/"));

app.listen(port);
Logger.info("Server started on port " + port);
