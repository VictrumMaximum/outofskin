import * as path from "path";
const fs = require("fs");
import Logger from "../Logs/Logger";
import {Promise} from "es6-promise";

const dataFolder = "./data/";
const testDataFolder = "./data/test/";

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
        const oldCache = this.cache;
        this.cache = data;
        return this.persist().catch((error) => {
            this.cache = oldCache;
            throw error;
        });
    }
}
