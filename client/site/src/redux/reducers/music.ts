const defaultState = {
	left: {
		title: "",
		videos: []
	},
	right: {
		title: "",
		videos: []
	}
};

export default (state = defaultState, action) => {
	switch (action.type) {
		case "SET_VIDEOS":
			return {
				left: action.left,
				right: action.right
			};
		default:
			return state;
	}
};
