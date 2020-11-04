import * as express from "express";
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
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
const portHttp = process.env.PORT_HTTP;
const portHttps = process.env.PORT_HTTPS;

// to support JSON-encoded bodies
app.use(express.json());
// to support URL-encoded bodiesW
app.use(express.urlencoded({extended: true}));
app.use(dataRoutes.tourDataRoute, tourRouter);
app.use(dataRoutes.bioDataRoute, bioRouter);
app.use(dataRoutes.subscribersDataRoute, subscribersRouter);
app.use(dataRoutes.musicDataRoute, musicRouter);
app.use(dataRoutes.pressDataRoute, pressRouter);

app.use("/menu", express.static(__dirname + "/../../client2/menuBuild/"));


if (process.env.NODE_ENV === 'production') {
    const privateKey = fs.readFileSync('/etc/letsencrypt/live/outofskin.com/privkey.pem', 'utf8');
    const certificate = fs.readFileSync('/etc/letsencrypt/live/outofskin.com/cert.pem', 'utf8');
    const ca = fs.readFileSync('/etc/letsencrypt/live/outofskin.com/chain.pem', 'utf8');

    const credentials = {
        key: privateKey,
        cert: certificate,
        ca: ca
    };
    // for static files except index.html
    app.use(express.static(resolve(__dirname + '/../../client2/build/')));
    // any other route should return index.html (specific route is handled by react router)
    app.get('/*', (req, res): void => {res.sendFile(resolve(__dirname + '/../../client2/build/index.html'))});

    http.createServer((req, res): void => {
        // redirects to secure site
        res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
        res.end();
    }).listen(portHttp, (): void => {
        Logger.info('HTTP Server running on port ' + portHttp);
    });

    https.createServer(credentials, app)
        .listen(portHttps, (): void => {
            Logger.info('HTTPS Server running on port ' + portHttps);
        });
} else {
    http.createServer(app).listen(portHttp, (): void => {
        Logger.info('HTTP Server running on port ' + portHttp);
    });
}

// app.listen(portHttp);
// Logger.info("Server started on port " + port);
