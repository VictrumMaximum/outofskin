import * as express from "express";
const app = express();
import tourRoutes from "./Routes/TourRoutes";
import bioRoutes from "./Routes/BioRoutes";
const staticSiteFiles = express.static(__dirname + "/client/site/");
import Logger from "./Logs/Logger";
const port = 3000;

const logVisitor = (req, res, next) => {
	Logger.debug((req.headers['x-forwarded-for'] || req.connection.remoteAddress) + "," + req.headers['user-agent']);
	next();
};

// to support JSON-encoded bodies
app.use(express.json());
// to support URL-encoded bodies
app.use(express.urlencoded({extended: true}));
app.use("/", staticSiteFiles);
app.use("/bio", staticSiteFiles);
app.use("/music", staticSiteFiles);
app.use("/contact", staticSiteFiles);
app.use("/press", staticSiteFiles);
app.use("/25oktoberwouterdetrex", express.static(__dirname + "/client/menu/"));

// log visitors
// this needs to be after setting the static middleware stuff
// https://stackoverflow.com/questions/44695187/express-middleware-getting-called-many-times
app.use(logVisitor);

app.use("/tourData", tourRoutes);
app.use("/bioData", bioRoutes);

app.listen(port);
Logger.info("Server started on port " + port);
