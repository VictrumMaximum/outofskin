import * as mysql from "mysql";
import * as QueryBuilder from "querybuilder";
import {Promise} from "es6-promise";
const config = require("./config");


const qb = new QueryBuilder("mysql");
const options = {
	user     : config.get("MYSQL_USER"),
	password : config.get("MYSQL_PASSWORD"),
	database : 'oldsite',
	dateStrings: true,
};

if (config.get("INSTANCE_CONNECTION_NAME") && config.get('NODE_ENV') === 'production') {
	options['socketPath'] = `/cloudsql/${config.get('INSTANCE_CONNECTION_NAME')}`;
}
const pool = mysql.createPool(options);

function add(query): Promise<any> {
	const dbQuery = qb.insert({
		eventName: query.eventName,
		eventLink: query.eventLink,
		city: query.city,
		begin: query.begin,
		end: query.end,
		location: query.location,
		locationLink: query.locationLink
	}).from("tours").call();

	return queryDatabase(dbQuery);
}

function fetchAll(): Promise<any> {
	const query = "SELECT * FROM tours";
	return queryDatabase(query);
}

function remove(id): Promise<any> {
	const query = "DELETE FROM tours WHERE id=" + id;
	return queryDatabase(query);
}

function getConnection(): any {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				console.log("Getting connection from pool failed with error " + JSON.stringify(err, null, 2));
				reject (err);
			}
			else {
				console.log("Got connection");
				resolve(connection);
			}
		});
	});
}

function queryDatabase(query: string): Promise<any> {
	return new Promise((resolve, reject) => {
		console.log("Executing query: " + query);
		getConnection().then((connection) => {
			connection.query(query, function (error, results, fields) {
				// make connection available for pool again, but doesn't destroy it.
				connection.release();
				if (error) {
					console.log("Database query failed with error " + JSON.stringify(error, null, 2));
					reject (error);
				}
				else {
					console.log("Database query succeeded");
					resolve(results);
				}
			});
		}).catch((error) => {
			reject(error)
		});
	});
}

export default {
	add,
	remove,
	fetchAll
};
