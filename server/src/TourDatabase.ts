import {TourDB} from "../../schemas/TourDBSchema";

const fs = require("fs");
import {Promise} from "es6-promise";

const sourceFile = "./data/new-tours.json";
const deletedFile = "./data/deleted_tours.json";

let tourCache: TourDB;
fs.readFile(sourceFile, "utf8", (err, data) => {
	if (err) throw err;
	tourCache = JSON.parse(data);
});

function test() {
	return testHelper()
		.then(() => {
			return testHelperHelper();
		})
		.then((msg) => {
			console.log(msg);
		})
		.catch(() => {
			throw ("errored in test");
		});
}

function testHelper() {
	return new Promise((resolve, reject) => {
		console.log("testHelper");
		resolve();
	});
}
function testHelperHelper() {
	return new Promise((resolve, reject) => {
		console.log("testHelperHelper");
		resolve("greetings from testhh");
	});
}

const fetchAll = () => {
	return new Promise((resolve, reject) => {
		if (tourCache && tourCache.data) {
			const tours = tourCache.data;
			resolve(tours);
		} else {
			reject("Tours not loaded");
		}
	});
};

function add(tour) {
	return addToMemory(tour)
		.then((id) => {
			return persist(sourceFile, tourCache)
		})
		// .catch((err) => {
		// 		removeFromMemory(id);
		// 		throw err;
		// 	});
}

function addToMemory(tour) {
	return new Promise((resolve, reject) => {
		console.log("adding tour to memory");
		const toursMetadata = tourCache.metadata;
		const tours = tourCache.data;
		const id = toursMetadata.maxKey + 1;
		if (tours.hasOwnProperty(id.toString())) {
			throw ("Tried to overwrite tour with id " + id);
		}
		tours[id] = tour;
		toursMetadata.maxKey = id;
		resolve();
	});
}

function removeFromMemory(id) {
	return new Promise((resolve, reject) => {
		console.log("removing tour from memory: " + id);
		const tours = tourCache.data;
		if (!tours.hasOwnProperty(id.toString())) {
			throw ("Cannot remove tour " + id + " from cache: does not exist");
		}
		delete tours[id];
		resolve();
	});
}

function update(id, updates) {
	console.log("updating tour: " + id);
	return updateInMemory(id, updates)
		.then(() => {
			return persist(sourceFile, tourCache);
		});
}

function updateInMemory(id, updates) {
	return new Promise((resolve, reject) => {
		console.log("Updating tour in memory");
		const tours = tourCache.data;
		if (!tours.hasOwnProperty(id)) {
			throw ("Tour id " + id + " does not exist");
		}
		const toUpdate = tours.data[id];
		const keysToUpdate = Object.keys(updates);
		for (const key in keysToUpdate) {
			toUpdate[key] = updates[key];
		}
		resolve();
	});
}

function persist(fileName, obj) {
	return new Promise((resolve, reject) => {
		console.log("Persisting to " + fileName);
		fs.writeFile(fileName, JSON.stringify(obj, null, 2), (error) => {
			if (error) {
				throw ("Error writing to " + fileName + ": " + JSON.stringify(obj, null, 2));
			}
			resolve();
		});
	});
}

function remove(id) {
	console.log("removing tour " + id);
	const tours = tourCache.data;
	// check if id exists
	if (!tours.hasOwnProperty(id)) {
		throw ("Cannot delete tour with id " + id + ": does not exist");
	}
	return addTourToDeleteFile(id).then(() => {
		console.log("persisted to deleteFile");
		// delete from object when persist is done
		delete tours[id];
		// TODO: if the following persist fails, the tour will still appear in the deleted file
		return persist(sourceFile, tours);
	});
}

function addTourToDeleteFile(id): Promise<any> {
	const promise = new Promise((resolve, reject) => {
		const toDelete = tourCache.data[id];
		fs.readFile(deletedFile, "utf8", (err, data) => {
			if (err) throw (err);
			console.log("read deleteFile");
			const deletedTours = JSON.parse(data);
			// check if this id does not have a duplicate in the deleted file
			if (deletedTours.data.hasOwnProperty(id)) {
				throw ("Tried to overwrite " + id + " in deleted file");
			}
			deletedTours.data[id] = toDelete;
			resolve(deletedTours);
		});
	});
	return promise.then((deletedTours) => {
		return persist(deletedFile, deletedTours);
	}).catch((err) => {throw err});
}

export default {
	add,
	remove,
	fetchAll,
	update,
	test
};
