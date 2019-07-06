import * as moment from "moment";
const winston = require("winston");
import * as fs from "fs";

const now = moment().format("YYYYMMDD");
const logDir =  __dirname + "/" + now;

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const Logger = new (winston.Logger)({
    level: "debug",
    exceptionHandlers: [
        new (winston.transports.Console)({ json: false, timestamp: true }),
        new winston.transports.File({ filename: logDir + "/exceptions.log", json: false }),
    ],
    exitOnError: false,
    transports: [
        new (winston.transports.Console)({ json: false, timestamp: true }),
        new winston.transports.File({ filename: logDir + "/debug.log", json: false }),
    ],
});

export default Logger;
