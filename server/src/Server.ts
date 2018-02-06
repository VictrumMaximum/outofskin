import * as express from "express";
const app = express();
import tourRoutes from "./Tours";
const port = 8080;

app.use(express.json());
app.use(express.urlencoded());
app.use("/tourData", tourRoutes);
app.use("/", express.static(__dirname + "/client"));
app.use("/bio", express.static(__dirname + "/client"));
app.use("/outofskin", express.static(__dirname + "/client"));
app.use("/press", express.static(__dirname + "/client"));
app.use("/contact", express.static(__dirname + "/client"));
app.use("/menu", express.static(__dirname + "/menu/"));

app.listen(port);
console.log("Server started on port " + port);
