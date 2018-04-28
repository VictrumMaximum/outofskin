import {Moment} from "moment";

export interface Tours {
	[id: string]: Tour
}

export interface Tour {
    eventName: string;
    eventLink: string;
    begin: Moment;
    city: string;
    location: string;
    locationLink: string;
}
