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
		// console.log("adding tour: " + tour);
		const id = parseInt(tours.metadata.maxKey)+1;
		if (tours.data.hasOwnProperty(id)) {
			throw ("Tried to overwrite tour with id " + id);
		}
		tours.data[id] = tour;
		tours.metadata["maxKey"] = id;
		return persist(sourceFile, tours);
	});
};

const update = (id, updates) => {
	return new Promise((resolve, reject) => {
		console.log("Updating tour: " + id);
		if (!tours.hasOwnProperty(id)) {
			throw ("Tour id " + id + " does not exist");
		}
		const toUpdate = tours.data[id];
		const keysToUpdate = Object.keys(updates);
		for (const key in keysToUpdate) {
			toUpdate[key] = updates[key];
		}
		return persist(sourceFile, tours);
	});
};

const persist = (fileName, obj) => {
	return new Promise((resolve, reject) => {
		fs.writeFile(fileName, JSON.stringify(obj, null, 2), (error) => {
			if (error) {
				throw ("Error writing to " + fileName + ": " + JSON.stringify(obj, null, 2));
			}
			resolve();
		});
	});
};

const remove = (id) => {
	return new Promise((resolve, reject) => {
		console.log("removing tour " + id);
		// check if id exists
		if (!tours.data.hasOwnProperty(id)) {
			throw ("Cannot delete tour with id " + id + ": does not exist");
		}
		const toDelete = tours.data[id];
		fs.readFile(deletedFile, "utf8", (err, data) => {
			if (err) throw (err);
			const deletedTours = JSON.parse(data);
			// check if this id does not have a duplicate in the deleted file
			if (deletedTours.data.hasOwnProperty(id)) {
				throw ("Tried to overwrite " + id + " in deleted file");
			}
			deletedTours.data[id] = toDelete;
			persist(deletedFile, deletedTours).then(() => {
				// delete from object when persist is done
				delete tours.data[id];
				// TODO: if the following persist fails, the tour will still appear in the deleted file
				return persist(sourceFile, tours);
			}).catch((err) => {
				throw (err)
			});
		});
	});
};

export default {
	add,
	remove,
	fetchAll,
	update
};
