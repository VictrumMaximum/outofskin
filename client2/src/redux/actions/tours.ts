import {TourWithoutID, TourJSON} from "../../../../schemas/TourSchema";

export const setTours = (tours: TourJSON) => {
	const splittedTours: TourWithoutID[][] = sortAndSplitTours(tours);
	return {
		type: "SET_TOURS",
		past: splittedTours[0],
		upcoming: splittedTours[1]
	};
};

// TODO: properly type these stupid tours to use
//  strings as date but afterwards assign a js Date to the same variable
//  without getting a type error.
function sortAndSplitTours(tours) {//: Tour[] {
	const compare = (a: TourWithoutID, b: TourWithoutID) => {
		if (a.begin.getTime() < b.begin.getTime()) {
			return -1;
		}
		if (a.begin.getTime() > b.begin.getTime()) {
			return 1;
		}
		return 0;
	};
	const parseDecimal = (str: string) => parseInt(str, 10);
	const sorted = Object.keys(tours)
		// convert to array
		.map((tourId) => {
			const tour = tours[tourId];
			// convert begin from string to Date
			const [date, time] = tour.begin.split(" ");
			const [hours, minutes] = time.split(":").map(parseDecimal);
			const [year, month, day] = date.split("-").map(parseDecimal);
			// console.log(`${year},${month},${day},${hours},${minutes}`);
			tour.begin = new Date(year, month - 1, day, hours, minutes); // TODO: use the constructor which takes all parameters separately?
			return tour;
		})
		.sort(compare);
	let i = 0;
	const now = new Date();
	// find index of first tour which comes after today
	while (i < sorted.length && sorted[i].begin.getTime() < now.getTime()) {
		i++;
	}
	// splice actually modifies the array, does not make a copy
	return [sorted.splice(0, i), sorted];
}
