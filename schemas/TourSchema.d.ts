import {Moment} from "moment";

export interface Tour {
	id: number;
	eventName: string;
	eventLink: string;
	begin: string;
	end: string;
	city: string;
	location: string;
	locationLink: string;
}
