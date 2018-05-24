import { combineReducers } from 'redux'
import tours from "./tours";
import bio from "./bio";
import music from "./music";
import press from "./press";

export default combineReducers({
	tours,
	bio,
	music,
	press
});
