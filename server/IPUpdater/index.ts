import axios, {AxiosResponse} from "axios";
import * as fs from "fs";
import Logger from "../Logs/Logger";
import * as readlineSync from "readline-sync";
import * as gmailSend from "gmail-send";
import {resolve} from "path";

const url = "https://api.ipify.org";
const filePath = resolve(__dirname + "/../../../data/ip.txt");
let currentIP: string;
const period = 43200000; // 12 hours
let send;

const start = () => {
	const password = readlineSync.question("Google app pass:", {
		hideEchoBack: true // The typed text on screen is hidden by `*` (default).
	});
	console.log(password);
	send = gmailSend({
		user: "victorpionescu@gmail.com",
		pass: password,
		to: "victorpionescu@gmail.com",
		subject: "IP change",
	});
	// check if ip file exists
	if (fs.existsSync(filePath)) {
		fs.readFile(filePath, (err, data) => {
			if (err) {
				Logger.error(err);
			} else {
				// store file content in a variable.
				currentIP = data.toString();
				// start checking ip
				startInterval();
			}
		});
	} else {
		// if file doesn't exist yet, create a new empty one.
		fs.writeFile(filePath, "", (err) => {
			if (err) {
				console.log(err);
			} else {
				Logger.info("Created new IP file");
				// start checking ip
				startInterval();
			}
		})
	}

};

const startInterval = () =>{
	checkIP();
	setInterval(checkIP, period);
};

const checkIP = () => {
	Logger.debug("Check IP");
	axios.get(url).then((response: AxiosResponse) => {
		const newIP = response.data.toString();
		if (currentIP !== newIP) {
			updateIP(newIP);
		}
	});
};

const updateIP = (newIP: string)=> {
	const msg = "Updated IP from " + currentIP + " to " + newIP;
	const writeToFile = () => {
		fs.writeFile(filePath, newIP, (err) => {
			if (err) {
				Logger.error(err);
			} else {
				Logger.info(msg);
				currentIP = newIP;
			}
		})
	};
	notifyDev(msg, writeToFile);
};

const notifyDev = (msg: string, callback) => {
	Logger.info("Sending message to dev: " + msg);
	send({
		text: msg
	}, (error, result, fullResult) => {
		if (error) {
			console.error(error);
		} else {
			console.log(result);
			callback();
		}
	});
};

// const handleException = (err: any) => {
// 	Logger.error(err);
// 	try {
// 		notifyDev(err.toString())
// 	} catch (err) {
// 		Logger.error("Failed to notify dev: " + err.toString());
// 	}
// };

export {start};
