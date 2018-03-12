"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var winston = require("winston");
var fs = require("fs");
var now = moment().format("YYYYMMDD");
var logDir = __dirname + "/" + now;
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}
var Logger = new (winston.Logger)({
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
exports.default = Logger;
