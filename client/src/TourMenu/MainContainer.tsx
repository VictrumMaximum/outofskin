import * as React from "react";
import TourMenu from "./TourMenu";
import TourList from "./TourList";

export default class MainContainer extends React.Component<{}, {}> {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<TourMenu/>
				<TourList/>
			</div>
		);
	}
}
