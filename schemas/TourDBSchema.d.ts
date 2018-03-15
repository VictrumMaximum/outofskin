export interface TourDB {
    metadata: {
        maxKey: number;
    };
    data: {
        [id: string]: {
            eventName: string;
            eventLink: string;
            begin: string;
            city: string;
            location: string;
            locationLink: string;
        }
    }
}
