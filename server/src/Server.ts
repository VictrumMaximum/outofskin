import * as express from "express";
const app = express();
import tourRoutes from "./TourRoutes";
import tourDB from "./TourDatabase";
const port = 8080;

const staticSiteFiles = express.static(__dirname + "/client/");
app.use(express.json());
app.use(express.urlencoded());
app.use("/tourData", tourRoutes);
app.use("/", staticSiteFiles);
app.use("/bio", staticSiteFiles);
app.use("/music", staticSiteFiles);
app.use("/contact", staticSiteFiles);
app.use("/press", staticSiteFiles);
app.use("/menu", express.static(__dirname + "/menu/"));

app.get("/test", (req, res) => {
	console.log("Received request to test");
	tourDB.test()
		.then((msg) => {
			console.log("test then");
			console.log(msg);
			res.end();
		}).catch((error) => {console.log(error); res.end();});
});

app.listen(port);
console.log("Server started on port " + port);
