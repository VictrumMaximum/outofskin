import {Tour, Tours} from "../../../../../schemas/TourSchema";
import moment = require("moment");

export const setTours = (tours: Tours) => {
	const splittedTours: Tour[][] = sortAndSplitTours(tours);
	return {
		type: "SET_TOURS",
		past: splittedTours[0],
		upcoming: splittedTours[1]
	};
};

function sortAndSplitTours(tours: Tours) {//: Tour[] {
	const compare = (a: Tour, b: Tour) => {
		if (a.begin.isBefore(b.begin)) {
			return -1;
		}
		if (a.begin.isAfter(b.begin)) {
			return 1;
		}
		return 0;
	};
	const sorted = Object.keys(tours)
		// convert to array
		.map((tourId) => {
			// convert begin from string to moment
			const tour = tours[tourId];
			tour.begin = moment(tour.begin);
			return tours[tourId]})
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
