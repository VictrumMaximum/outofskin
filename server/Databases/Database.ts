import * as path from "path";
import * as fs from "fs";
import {resolve} from "path";
import Logger from "../Logs/Logger";

const dataFolder = resolve(__dirname + "/../../../data/");
const testDataFolder = resolve(__dirname + "/../../../data/test/");

/**
 * The general structure of the datafiles is
 * {
 * 		metadata: object 			(optional)
 * 		deletedX: array | object	(optional)
 * 		data: array | object
 * }
 *
 */

export default class Database {

    protected cache;
    private readonly fileName;
    private fullPath;

    constructor (fileName) {
        this.fileName = fileName;
        this.read(fileName);
    }

    private read(fileName) {
        // try live data
        fs.readFile(path.join(dataFolder, fileName), "utf8", (err, data) => {
            if (err) {
                // use test data instead
                Logger.warn("Using test " + fileName + "!--------------------------------------------");
                fs.readFile(path.join(testDataFolder, fileName), "utf8", (err, data) => {
                    if (err)
                        throw err; // never caught, should terminate the program
                    this.cache = JSON.parse(data);
                    this.fullPath = path.join(testDataFolder, fileName);
                });
            } else {
                this.cache = JSON.parse(data);
                this.fullPath = path.join(dataFolder, fileName);
            }
        });
    }

    // persists cache to file
    protected persist() {
        return new Promise((resolve) => {
            Logger.debug("Persisting to " + this.fileName);
            fs.writeFile(this.fullPath, JSON.stringify(this.cache, null, 2), (error) => {
                if (error) {
                    throw ("Error writing to " + this.fullPath + ": " + JSON.stringify(this.cache, null, 2));
                }
                resolve();
            })
        });
    };

    // returns the data part of the cache
    public fetch() {
        return new Promise((resolve, reject) => {
            if (this.cache && this.cache.data) {
                resolve(this.cache.data);
            } else {
                throw (this.fullPath + " not loaded or no data!");
            }
        });
    }

    // completely replaces the cache
    public update(data) {
        const oldData = this.cache.data;
        this.cache.data = data;
        return this.persist().catch((error) => {
            this.cache = oldData;
            throw error;
        });
    }
}
