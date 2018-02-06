import {Tour} from "../../TourMenu/TourSchema";

export const setTours = (tours: Tour[]) => {
	return {
		type: "SET_TOURS",
		tours
	};
};
