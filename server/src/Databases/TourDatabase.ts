import {Promise} from "es6-promise";
import Logger from "../Logs/Logger";
import Database from "./Database";

export default class TourDatabase extends Database {

    public addTour(tour) {
		return new Promise(() => {
            const toursMetadata = this.cache.metadata;
            const tours = this.cache.data;
            // get next id
            const id = toursMetadata.maxKey + 1;
            // check if id already exists (should never happen!)
            if (tours.hasOwnProperty(id.toString())) {
                throw ("Tried to overwrite tour with id " + id);
            }
            // update cache
            tours[id] = tour;
            toursMetadata.maxKey = id;
            return this.persist().catch((error) => {
            	// if persisting went wrong, undo updating cache
            	delete tours[id];
            	toursMetadata.maxKey--;
            	// propagate error
            	throw error;
			});
		});
    }

    public updateTour(id, updates) {
        return new Promise((resolve, reject) => {
            Logger.debug("Updating tour: " + id);
            const tours = this.cache.data;

            // check if id exists
            if (!tours.hasOwnProperty(id)) {
                throw ("Tour id " + id + " does not exist");
            }

            const toUpdate = tours[id];
            const keysToUpdate = Object.keys(updates);
            // old values used to undo change in case of persist fail
            const oldValues = {};

            for (let i = 0; i < keysToUpdate.length; i++) {
                const key = keysToUpdate[i];
                // first copy old value
                oldValues[key] = toUpdate[key];
                // then update value
                toUpdate[key] = updates[key];
            }

            return this.persist().catch((error) => {
            	// revert changes
                for (let i = 0; i < keysToUpdate.length; i++) {
                    const key = keysToUpdate[i];
                    toUpdate[key] = oldValues[key];
                }
                // propagate error
				throw error;
			});
        });

    }

    public removeTour(id) {
        Logger.debug("Removing tour " + id);
        const tours = this.cache.data;
        // check if id exists
        if (!tours.hasOwnProperty(id)) {
            throw ("Cannot delete tour with id " + id + ": does not exist");
        }
        const deletedTours = this.cache.deletedTours;
        // first copy to deletedTours
        deletedTours[id] = tours[id];
        // then delete in the object
		delete tours[id];
		return this.persist().catch((error) => {
			// undo delete
			tours[id] = deletedTours[id];
			delete deletedTours[id];
			// propagate error
			throw error
		});
    }
}
