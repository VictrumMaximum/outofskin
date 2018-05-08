import * as React from "react";
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";

export default class MainContainer extends React.Component<{}, {}> {
	constructor(props) {
		super(props);
		document.documentElement.style.backgroundImage = props.background;
	}

	render() {
		return (
			<div>
				<LeftColumn/>
				<RightColumn/>
			</div>
		);
	}
}
