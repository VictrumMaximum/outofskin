import * as mysql from "mysql";
import * as QueryBuilder from "querybuilder";
import {Promise} from "es6-promise";
const config = require("./config");


const qb = new QueryBuilder("mysql");
const options = {
	user     : config.get("MYSQL_USER"),
	password : config.get("MYSQL_PASSWORD"),
	database : 'oldsite',
	dateStrings: true
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

	return queryDatabase(dbQuery, []);
}

function fetchAll(options): Promise<any> {
	let query = "SELECT * FROM tours";
	const parameters = [];
	if (options.orderBy) {
		query += " ORDER BY " + options.orderBy;
	}
	if (options.limit) {
		query += " LIMIT ?";
		parameters.push(parseInt(options.limit));
	}
	return queryDatabase(query, parameters);
}

function remove(id): Promise<any> {
	const query = "DELETE FROM tours WHERE id=?";
	const parameters = [id];
	return queryDatabase(query, parameters);
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

function queryDatabase(query: string, parameters: any[]): Promise<any> {
	return new Promise((resolve, reject) => {
		console.log("Executing query: " + query);
		console.log("With parameters: " + parameters);
		getConnection().then((connection) => {
			connection.query(query, parameters, function (error, results, fields) {
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