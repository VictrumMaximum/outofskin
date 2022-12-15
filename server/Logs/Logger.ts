import { createLogger, transports, format } from 'winston';
import {resolve} from "path";

const myFormat = format.combine(
    format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    format.printf(info => `[${info.timestamp}] [${info.level}]: ${JSON.stringify(info.message, null, 2)}`),
);

const logger = createLogger({
    exceptionHandlers: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                myFormat,
            ),
        }),
        new transports.File({ filename: resolve(__dirname + "exceptions.log")}),
    ],
    exitOnError: true, // default
    format: myFormat,
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                myFormat,
            ),
            level: 'silly',
        }),
        new transports.File({
            filename: resolve(__dirname + "combined.log"),
            level: 'debug',
        }),
    ],
});
export default logger;
