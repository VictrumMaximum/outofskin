import {Tours} from "./TourSchema";

export interface TourDB {
    metadata: {
        maxKey: number;
    };
    data: Tours
}
