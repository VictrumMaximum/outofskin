import * as React from "react";

interface ButtonProps {
	socialMedia: {
		name: string;
		image: string;
	}
}

export default class Button extends React.Component<ButtonProps, {}> {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={"offset-11 col-1"}>
				<img src={"./images/" + this.props.socialMedia.image} />
			</div>
		);
	}
}
