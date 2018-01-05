import * as mysql from "mysql";
import * as QueryBuilder from "querybuilder";
import {Promise} from "es6-promise";

export default class TourDatabase {

	private qb;
	private pool;

	constructor(config) {
		this.qb = new QueryBuilder("mysql");
		this.pool = mysql.createPool(config);
	}

	public addTour(query): Promise<any> {
		const dbQuery = this.qb.insert({
			event: query.event,
			begin: query.begin,
			city: query.city,
			establishment: query.establishment
		}).from("tours").call();

		return this.queryDatabase(dbQuery); // shouldn't this be dbQuery?
	}

	public fetchTours(): Promise<any> {
		const query = "SELECT * FROM tours";
		return this.queryDatabase(query);
	}

	public deleteTour(id): Promise<any> {
		const query = "DELETE FROM tours WHERE id=" + id;
		return this.queryDatabase(query);
	}

	private getConnection(): any {
		return new Promise((resolve, reject) => {
			this.pool.getConnection((err, connection) => {
				if (err) {
					console.log("Getting connection from pool failed with error " + JSON.stringify(err, null, 2));
					reject(err);
				}
				else {
					resolve(connection);
				}
			});
		});
	}

	private queryDatabase(query: string): Promise<any> {
		return new Promise((resolve, reject) => {
			console.log("Executing query: " + query);
			this.getConnection()
				.then((connection) => {
				console.log("got connection");
					connection.query(query, function (error, results, fields) {
						// make connection available for pool again, but doesn't destroy it.
						connection.release();
						if (error) {
							console.log("Database query failed with error " + JSON.stringify(error, null, 2));
							reject(error);
						}
						else {
							console.log("Database query succeeded");
							resolve(results);
						}
					});
				}).catch((error) => {
					// propagate the error
					reject(error);
				});
		});
	}
}
