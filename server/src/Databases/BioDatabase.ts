const fs = require("fs");
import {Promise} from "es6-promise";
import Logger from "../Logs/Logger";

let sourceFile = "./data/bio.json";

let bioCache: string;
// try live data
fs.readFile(sourceFile, "utf8", (err, data) => {
	if (err) {
		// use test data instead
		Logger.warn("Using test bio!--------------------------------------------");
		sourceFile = "./data/test/bio.json";
		fs.readFile(sourceFile, "utf8", (err, data) => {
			if (err) throw err;
			bioCache = data;
		});
	} else {
		bioCache = data;
	}
});

const fetch = () => {
	return new Promise((resolve, reject) => {
		if (bioCache) {
			resolve(bioCache);
		} else {
			reject("Bio not loaded");
		}
	});
};

function update(newBio) {
	return new Promise((resolve, reject) => {
		bioCache = newBio;
		return persist(sourceFile, newBio);
	});
}

function persist(fileName, obj) {
	return new Promise((resolve, reject) => {
        Logger.debug("Persisting to " + fileName);
		fs.writeFile(fileName, JSON.stringify(obj, null, 2), (error) => {
			if (error) {
				throw ("Error writing to " + fileName + ": " + JSON.stringify(obj, null, 2));
			}
			resolve();
		});
	});
}

export default {
	fetch,
	update
};
