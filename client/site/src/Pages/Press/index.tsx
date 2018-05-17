import * as React from "react";
import PressColumn from "./PressColumn";
import {left, right} from "./quotes";

export default class MainContainer extends React.Component<{}, {}> {
	constructor(props) {
		super(props);
		document.documentElement.style.backgroundImage = props.background;
	}

	render() {
		return (
			<div>
				<PressColumn quotes={left}/>
				<PressColumn quotes={right}/>
			</div>
		);
	}
}
