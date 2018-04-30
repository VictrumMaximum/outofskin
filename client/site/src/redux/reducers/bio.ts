export default (state = "", action) => {
	switch (action.type) {
		case "SET_BIO":
			return action.newBio;
		default:
			return state;
	}
};
