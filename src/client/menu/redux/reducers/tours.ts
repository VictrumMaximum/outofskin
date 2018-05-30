import {TourWithID} from "../../../../schemas/TourSchema";
import moment = require("moment");

export default (state = {
	past: [],
	upcoming: []
}, action) => {
	switch (action.type) {
		case "SET":
			return {
				past: action.past,
				upcoming: action.upcoming
			};
		case "DELETE":
			// find tour and delete it
			for (let i = 0; i < state.past.length; i++) {
				if (state.past[i].id === action.id) {
					return {
						past: [
							...state.past.slice(0, i),
							...state.past.slice(i + 1)
						],
						upcoming: state.upcoming
					};
				}
			}
			for (let i = 0; i < state.upcoming.length; i++) {
				if (state.upcoming[i].id === action.id) {
					return {
						past: state.past,
						upcoming: [
							...state.upcoming.slice(0, i),
							...state.upcoming.slice(i + 1)
						]
					};
				}
			}
			return state;

		case "EDIT":
			// find tour and set edit to action value
			return {
				past: state.past.map((tour: TourWithID) => {
					if (tour.id === action.id) {
						return {
							...tour,
							...{edit: action.edit}
						};
					}
					return tour;
				}),
				upcoming: state.upcoming.map((tour: TourWithID) => {
					if (tour.id === action.id) {
						return {
							...tour,
							...{edit: action.edit}
						};
					}
					return tour;
				})
			};
		case "UPDATE":
			// find tour and set replace it
			const newState = {
				past: state.past.map((tour: TourWithID) => {
					if (tour.id === action.newTour.id) {
						return {...action.newTour, ...{edit: false}};
					}
					return tour;
				}),
				upcoming: state.upcoming.map((tour: TourWithID) => {
					if (tour.id === action.newTour.id) {
						return {...action.newTour, ...{edit: false}};
					}
					return tour;
				})
			};
			return newState;

		case "ADD":
			console.log(action);
			// add id to tour
			const newTour = {...action.newTour, ...{id: action.id}};
			// and add to past or upcoming
			if (newTour.begin.isBefore(moment())) {
				console.log("go to past");
				for (let i = 0; i < state.past.length; i++) {
					if (newTour.begin.isBefore(state.past[i].begin)) {
						console.log("found isbefore");
						return {
							past: [
								...state.past.slice(0, i),
								newTour,
								...state.past.slice(i)
							],
							upcoming: state.upcoming
						};
					}
				}
				return {
					past: [
						...state.past,
						newTour,
					],
					upcoming: state.upcoming
				};
			} else {
				console.log("go to upcoming");
				for (let i = 0; i < state.upcoming.length; i++) {
					if (newTour.begin.isBefore(state.upcoming[i].begin)) {
						return {
							past: state.past,
							upcoming: [
								...state.upcoming.slice(0, i),
								newTour,
								...state.upcoming.slice(i)
							]
						};
					}
				}
				return {
					past: state.past,
					upcoming: [
						...state.upcoming,
						newTour,
					]
				};
			}
		default:
			return state;
	}
};
