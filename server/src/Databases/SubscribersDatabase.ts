import Database from "./Database";
import {Promise} from "es6-promise";
import * as moment from "moment";

const tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

export default class SubscribersDatabase extends Database {

	public addSubscriber(email: string) {
		return this.verifyEmail(email).then(() => {
			const subscribers = this.cache.data;
			if (subscribers.hasOwnProperty(email)) {
				// TODO: indicate somehow that this should be displayed the user
				throw ("Email already in use: " + email);
			}
			subscribers[email] = {
				joinDate: moment()
			};
			return this.persist().catch((error) => {
				delete subscribers[email];
				// propagate error
				throw error;
			});
		});
	}

	private verifyEmail(email: string) {
		return new Promise((resolve) => {
			if (!email)
				throw ("Email undefined");

			if(email.length > 254)
				throw ("Email length too long");

			const valid = tester.test(email);
			if(!valid)
				throw ("Invalid email");

			// Further checking of some things regex can't handle
			const parts = email.split("@");
			if(parts[0].length > 64)
				throw ("Local part too long");

			const domainParts = parts[1].split(".");
			if (domainParts.some((part) => { return part.length > 63; }))
				throw ("One of the domain parts too long");

			resolve();
		});
	}
}
