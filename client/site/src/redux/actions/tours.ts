import {Tours} from "../../../../../schemas/TourSchema";

export const setTours = (tours: Tours) => {
	return {
		type: "SET_TOURS",
		tours
	};
};
