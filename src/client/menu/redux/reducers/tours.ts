import {TourWithID} from "../../../../schemas/TourSchema";

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

		default:
			return state;
	}
};
