import * as React from "react";

export default class MainContainer extends React.Component<{}, {}> {
	constructor(props) {
		super(props);
		document.documentElement.style.backgroundImage = props.background;
	}

	render() {
		return (
			<div>
				Press
			</div>
		);
	}
}
