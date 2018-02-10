const fs = require("fs");
import {Promise} from "es6-promise";

const sourceFile = "./data/new-tours.json";
const deletedFile = "./data/deleted_tours.json";

let tours;
fs.readFile(sourceFile, "utf8", (err, data) => {
	if (err) throw err;
	tours = JSON.parse(data);
});

const fetchAll = () => {
	return new Promise((resolve, reject) => {
		if (tours && tours.data) {
			resolve(tours.data);
		} else {
			reject("Tours not loaded");
		}
	});
};

const add = (tour) => {
	return new Promise((resolve, reject) => {
		console.log("adding tour: " + tour);
		const id = parseInt(tours.metadata.maxKey)+1;
		if (tours.data.hasOwnProperty(id)) {
			reject("Tried to overwrite tour with id " + id);
		} else {
			tours.data[id] = tour;
			tours.metadata["maxKey"] = id;
			return persist(sourceFile, tours);
		}
	});
};

const update = (id, tour) => {

};

const persist = (fileName, obj) => {
	return new Promise((resolve, reject) => {
		fs.writeFile(fileName, JSON.stringify(obj, null, 2), (error) => {
			if (error) {
				reject("Error writing to " + fileName + ": " + JSON.stringify(obj, null, 2));
			} else {
				resolve();
			}
		});
	});
};

const remove = (id) => {
	return new Promise((resolve, reject) => {
		console.log("removing tour " + id);
		if (!tours.data.hasOwnProperty(id)) {
			reject("Cannot delete tour with id " + id + ": does not exist");
		} else {
			const toDelete = tours.data[id];
			fs.readFile(deletedFile, "utf8", (err, data) => {
				if (err) {
					reject(err);
				} else {
					const deletedTours = JSON.parse(data);
					if (deletedTours.data.hasOwnProperty(id)) {
						reject("Tried to overwrite " + id + " in deleted file");
					} else {
						deletedTours.data[id] = toDelete;
						console.log(deletedTours.data);
						persist(deletedFile, deletedTours).then(() => {
							delete tours.data[id];
							return persist(sourceFile, tours);
						}).catch((err) => {
							reject(err)
						});
					}
				}
			});
		}
	});
};

export default {
	add,
	remove,
	fetchAll
};
