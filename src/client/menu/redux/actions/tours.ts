import {TourJSON, TourWithID, TourWithoutID} from "../../../../schemas/TourSchema";

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

const compare = (a: TourWithoutID, b: TourWithoutID) => {
	if (a.begin < b.begin) {
		return -1;
	}
	if (a.begin > b.begin) {
		return 1;
	}
	return 0;
};

export const formatDate = (date) => {
	const pad = function (num) {
		return (num < 10 ? "0" : "") + num;
	};
	return (
		date.getFullYear() +
		"-" +
		pad(date.getMonth() + 1) +
		"-" +
		pad(date.getDate()) +
		" " +
		pad(date.getHours()) +
		":" +
		pad(date.getMinutes())
	);
};

function sortAndSplitTours(tours: TourJSON): TourWithID[][] {

	const sorted: TourWithID[] = Object.keys(tours)
		// convert to array
		.map((tourId) => {
			// since this is the reducer for the menu, we need to
			// keep track of that id so that we can reference it
			// if it gets updated or deleted
			const tour: TourWithID = {...tours[tourId], ...{id: tourId, edit: false}};
			// convert begin from string to moment
			return tour})
		.sort(compare);
	let i = 0;
	const now = formatDate(new Date());

	// find index of first tour which comes after today
	while (i < sorted.length && sorted[i].begin < now) {
		console.log(i);
		i++;
	}
	// splice actually modifies the array, does not make a copy
	return [sorted.splice(0, i), sorted];
}
