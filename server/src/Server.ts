import * as express from "express";
const app = express();
import tourRoutes from "./Tours";
const port = 8080;

app.use(express.static(__dirname + "/client/"));
app.use("/menu", express.static(__dirname + "/menu/"));
app.use("/tourData", tourRoutes);

app.listen(port);
console.log("Server started on port " + port);
