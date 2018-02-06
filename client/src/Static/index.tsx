import * as React from "react";
import SocialMedia from "./SocialMedia";
import MenuBar from "./MenuBar";

export default class Static extends React.Component<{}, {}> {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div style={{marginTop: "5em"}}>
				<MenuBar />
				{/*<SocialMedia/>*/}
			</div>
		);
	}
}
