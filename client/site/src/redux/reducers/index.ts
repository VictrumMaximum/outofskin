import { combineReducers } from 'redux'
import tours from "./tours";
import bio from "./bio";
import music from "./music";

export default combineReducers({
	tours,
	bio,
	music
});
