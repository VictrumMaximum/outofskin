import axios, {AxiosResponse} from "axios";
import * as fs from "fs";
import Logger from "../Logs/Logger";

const url = "https://api.ipify.org";
const filePath = "./data/ip.txt";
let currentIP: string;
const period = 5000;

const start = () => {
	if (fs.existsSync(filePath)) {
		fs.readFile(filePath, (err, data) => {
			if (err) {
				Logger.error(err);
			} else {
				currentIP = data.toString();
				setInterval(checkIP, period);
			}
		});
	} else {
		fs.writeFile(filePath, "", (err) => {
			if (err) {
				Logger.error(err);
			} else {
				Logger.info("Created new IP file");
				setInterval(checkIP, period);
			}
		})
	}

};

const checkIP = () => {
	axios.get(url).then((response: AxiosResponse) => {
		const newIP = response.data.toString();
		if (currentIP !== newIP) {
			updateIP(newIP);
		}
	}).catch((err: AxiosResponse) => {
		Logger.error(err);
	});
};

const updateIP = (newIP: string)=> {
	fs.writeFile(filePath, newIP, (err) => {
		if (err) {
			Logger.error(err);
		} else {
			currentIP = newIP;
			Logger.info("Updated IP from " + currentIP + " to " + newIP)
		}
	})
};

export {start};
