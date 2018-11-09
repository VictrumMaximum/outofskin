import axios, {AxiosResponse} from "axios";
import * as fs from "fs";
import Logger from "../Logs/Logger";

const url = "https://api.ipify.org";
const filePath = "./data/ip.txt";
const niceApiFilePath = "./data/NiceApi.json";
let niceApiHeaders: {};
let currentIP: string;
const period = 43200000; // 12 hours

const start = () => {
	// setup NiceApi
	// https://niceapi.net/
	if (fs.existsSync(niceApiFilePath)) {
		fs.readFile(niceApiFilePath, "utf8", (err, data) => {
			if (err) {
				Logger.error(err);
				// terminate program if niceapi can't be set up.
				throw err;
			} else {
				niceApiHeaders = JSON.parse(data);
			}
		});
	} else {
		throw "No NiceApi config";
	}
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
				Logger.error(err);
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
	}).catch(handleException);
};

const updateIP = (newIP: string)=> {
	fs.writeFile(filePath, newIP, (err) => {
		if (err) {
			Logger.error(err);
		} else {
			const msg = "Updated IP from " + currentIP + " to " + newIP;
			Logger.info(msg);
			notifyDev(msg);
			currentIP = newIP;
		}
	})
};

const notifyDev = (msg: string) => {
	Logger.info("Sending message to dev: " + msg);
	axios.post("https://NiceApi.net/API", msg, {
		headers: niceApiHeaders
	}).then((response: AxiosResponse) => {
		const responseMessage = response.data.toString();
		Logger.debug(responseMessage);
	});
};

const handleException = (err: any) => {
	Logger.error(err);
	try {
		notifyDev(err.toString())
	} catch (err) {
		Logger.error("Failed to notify dev: " + err.toString());
	}
};

export {start};
