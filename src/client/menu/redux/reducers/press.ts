const defaultState = {
	left: [],
	right: []
};

export default (state = defaultState, action) => {
	switch (action.type) {
		case "SET_QUOTES":
			return {
				left: action.left,
				right: action.right
			};
		default:
			return state;
	}
};
