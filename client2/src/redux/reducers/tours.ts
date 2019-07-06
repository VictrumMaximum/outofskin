export default (state = {
	past: [],
	upcoming: []
}, action) => {
	switch (action.type) {
		case "SET_TOURS":
			return {
				past: action.past,
				upcoming: action.upcoming
			};
		default:
			return state;
	}
};
