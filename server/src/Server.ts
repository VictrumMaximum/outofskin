import * as express from "express";
const app = express();
import tourRoutes from "./TourRoutes";
const staticSiteFiles = express.static(__dirname + "/client/site/");
import Logger from "./Logs/Logger";
const port = 8080;

app.use(express.json());
app.use(express.urlencoded());
app.use("/tourData", tourRoutes);
app.use("/", staticSiteFiles);
app.use("/bio", staticSiteFiles);
app.use("/music", staticSiteFiles);
app.use("/contact", staticSiteFiles);
app.use("/press", staticSiteFiles);
app.use("/25oktoberwouterdetrex", express.static(__dirname + "/client/menu/"));

app.listen(port);
Logger.info("Server started on port " + port);
