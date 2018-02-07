import {Tour} from "../../../../../schemas/TourSchema";

export const setTours = (tours: Tour[]) => {
	return {
		type: "SET_TOURS",
		tours
	};
};
