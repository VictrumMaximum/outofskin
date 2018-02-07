const fs = require("fs");
import {Promise} from "es6-promise";

const sourceFile = "./new-tours.json";

let tours;
fs.readFile(sourceFile, "utf8", (err, data) => {
	console.log("read file");
	if (err) throw err;
	tours = JSON.parse(data);
	const metadata = tours.metadata;
	if (!metadata.hasOwnProperty("size")) {
		metadata["size"] = Object.keys(tours.data).length;
	}
	if (!metadata.hasOwnProperty("maxKey")) {
		const keys = Object.keys(tours.data);
		let max = keys[0];
		for (let i = 0; i < keys.length; i++) {
			if (keys[i] > max) {
				max = keys[i];
			}
		}
		metadata["maxKey"] = max;
	}
});

const fetchAll = () => {
	return new Promise((resolve, reject) => {
		if (tours && tours.data) {
			reject("Tours not loaded");
		} else {
			resolve(tours.data);
		}
	});
};

const add = (query) => {
	return new Promise((resolve, reject) => {
		const tour = extractTourFromQuery(query);
		const id = tours.metadata.maxKey+1;
		if (tours.data.hasOwnProperty(id)) {
			reject("Tried to overwrite tour with id " + id);
		} else {
			tours.data[id] = tour;
			tours.metadata["maxKey"] = id;
			tours.metadata["size"] = tours.metadata["size"]+1;
			fs.writeFile(sourceFile, JSON.stringify(tours, null, 2), (error) => {
				if (error) {
					reject("Error writing new tour to file");
				} else {
					resolve();
				}
			});
		}
	});
};

const remove = (id) => {
	return new Promise((resolve, reject) => {
		if (!tours.data.hasOwnProperty(id)) {
			reject("Cannot delete tour with id " + id + ": does not exist");
		} else {
			reject("Remove tour not yet implemented");
		}
	});
};

const extractTourFromQuery = (query) => {

};

export default {
	add,
	remove,
	fetchAll
};
