// This is how tours are stored and sent between client and server.
export interface TourJSON {
	[id: string]: TourWithoutID | {begin: string}
}

// This is for the tourmenu, where we need the id
// to update or delete a tour, but also need tours as
// an array to keep them ordered in a specific way.
export interface TourWithID {
	id: string;
	eventName: string;
	eventLink: string;
	begin: Date;
	city: string;
	location: string;
	locationLink: string;
	edit: boolean;
}

// This is for the site
export interface TourWithoutID {
    eventName: string;
    eventLink: string;
    begin: Date;
    city: string;
    location: string;
    locationLink: string;
}
