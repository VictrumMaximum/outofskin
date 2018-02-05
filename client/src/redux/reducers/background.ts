const options = require("../../Static/MenuBar/menuOptions").default;

export default (state = options.home.background, action) => {
	switch (action.type) {
		case 'SET_BACKGROUND':
			return action.background;
		default:
			return state
	}
};
