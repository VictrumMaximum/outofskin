import * as React from "react";
require("../../media/images/tour.jpg");

export default class MainContainer extends React.Component<{}, {}> {
	constructor(props) {
		super(props);
	}

	render() {
		const backgroundPath = "../../media/images/tour.jpg";
		const fullBackgroundPath = "url(" + backgroundPath + ")";

		return (
			<div>
				BioContaqiner
			</div>
		);
	}
}
