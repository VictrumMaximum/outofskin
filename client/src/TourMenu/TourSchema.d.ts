import {Moment} from "moment";

export interface Tour {
	id: number;
	event: string;
	begin: Moment;
	city: string;
	establishment: string;
}
