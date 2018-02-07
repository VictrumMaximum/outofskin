export default (state = [], action) => {
	switch (action.type) {
		case "SET_TOURS":
			return action.tours;
		default:
			return state;
	}
};
