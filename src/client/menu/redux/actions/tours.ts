import {TourJSON, TourWithID, TourWithoutID} from "../../../../schemas/TourSchema";
import moment = require("moment");

export const setTours = (tours: TourJSON) => {
	const splittedTours: TourWithID[][] = sortAndSplitTours(tours);
	return {
		type: "SET",
		past: splittedTours[0],
		upcoming: splittedTours[1]
	};
};

export const deleteTour = (id: string) => {
	return {
		type: "DELETE",
		id
	};
};

export const updateTour = (newTour: TourWithID) => {
	return {
		type: "UPDATE",
		newTour
	};
};

export const startEdit = (id: string) => {
	return {
		type: "EDIT",
		id,
		edit: true
	};
};

export const stopEdit = (id: string) => {
	return {
		type: "EDIT",
		id,
		edit: false
	};
};

export const addTour = (id: string, newTour: TourWithoutID) => {
	return {
		type: "ADD",
		id,
		newTour
	};
};

function sortAndSplitTours(tours: TourJSON): TourWithID[][] {
	const compare = (a: TourWithoutID, b: TourWithoutID) => {
		if (a.begin.isBefore(b.begin)) {
			return -1;
		}
		if (a.begin.isAfter(b.begin)) {
			return 1;
		}
		return 0;
	};
	const sorted: TourWithID[] = Object.keys(tours)
		// convert to array
		.map((tourId) => {
			// since this is the reducer for the menu, we need to
			// keep track of that id so that we can reference it
			// if it gets updated or deleted
			const tour: TourWithID = {...tours[tourId], ...{id: tourId, edit: false}};
			// convert begin from string to moment
			tour.begin = moment(tour.begin);
			return tour})
		.sort(compare);
	let i = 0;
	const now = moment();
	// find index of first tour which comes after today
	while (sorted[i].begin.isBefore(now) && i < sorted.length) {
		i++;
	}
	// splice actually modifies the array, does not make a copy
	return [sorted.splice(0, i), sorted];
}
