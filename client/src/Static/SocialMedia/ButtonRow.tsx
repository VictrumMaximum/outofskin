import * as React from "react";
import Button from "./Button";
const styles = require("./styles/socialMedia.less");

interface ButtonRowProps {
	socialMedia: {
		name: string;
		image: string;
	}
}

export default class ButtonRow extends React.Component<ButtonRowProps, {}> {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={"row"}>
				<Button socialMedia={this.props.socialMedia}/>
			</div>
		);
	}
}
