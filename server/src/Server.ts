import * as express from "express";
const app = express();
import tourRoutes from "./TourRoutes";
const port = 8080;

const staticSiteFiles = express.static(__dirname + "/client/site/");
app.use(express.json());
app.use(express.urlencoded());
app.use("/tourData", tourRoutes);
app.use("/", staticSiteFiles);
app.use("/bio", staticSiteFiles);
app.use("/music", staticSiteFiles);
app.use("/contact", staticSiteFiles);
app.use("/press", staticSiteFiles);
app.use("/menu", express.static(__dirname + "/client/menu/"));

app.listen(port);
console.log("Server started on port " + port);
