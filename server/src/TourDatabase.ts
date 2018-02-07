const fs = require("fs");
import {Promise} from "es6-promise";

let tours;
fs.readFile("./tours.json", "utf8", (err, data) => {
	if (err) throw err;
	tours = JSON.parse(data);
});

const fetchAll = () => {
	return new Promise((resolve, reject) => {
		resolve(tours.data);
	});
};

const add = (tour) => {
	return new Promise((resolve, reject) => {
		reject("still need to implement add");
	});
};

const remove= (id) => {
	return new Promise((resolve, reject) => {
		reject("still need to implement remove");
	});
};

const createBackup = () => {

};

// fs.writeFile("new-tours.json", JSON.stringify(tours));

export default {
	add,
	remove,
	fetchAll
};
