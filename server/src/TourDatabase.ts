import * as mysql from "mysql";
import * as QueryBuilder from "querybuilder";
import {Promise} from "es6-promise";


const qb = new QueryBuilder("mysql");
const config = {
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database : 'oldsite'
};
const pool = mysql.createPool(config);

function add(query): Promise<any> {
	const dbQuery = qb.insert({
		eventName: query.eventName,
		city: query.city,
		beginDate: query.beginDate,
		endDate: query.endDate,
		beginTime: query.beginTime,
		endTime: query.endTime,
		location: query.location
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
				throw (err);
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
					throw (error);
				}
				else {
					console.log("Database query succeeded");
					resolve(results);
				}
			});
		})
	});
}

export default {
	add,
	remove,
	fetchAll
};
