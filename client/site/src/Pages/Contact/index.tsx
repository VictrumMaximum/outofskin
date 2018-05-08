import * as React from "react";
import Menu from "../../Static/MenuBar";
require("../../../media/images/tour.jpg");

export default class MainContainer extends React.Component<{}, {}> {
	constructor(props) {
		super(props);
		document.documentElement.style.backgroundImage = props.background;
	}

	render() {
		const backgroundPath = "../../media/images/tour.jpg";
		const fullBackgroundPath = "url(" + backgroundPath + ")";

		const breaks = [];
		for (let i = 0; i < 70; i++) {
			breaks.push((<br/>))
		}

		return (
			<div>
				hello1
				{breaks}
				hello2
			</div>
		);
	}
}
