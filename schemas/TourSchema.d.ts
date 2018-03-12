import {Moment} from "moment";

export interface Tour {
    id: number;
    eventName: string;
    eventLink: string;
    begin: Moment;
    city: string;
    location: string;
    locationLink: string;
}
