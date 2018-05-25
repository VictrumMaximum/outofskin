import * as React from "react";
const styles = require("./styles.less");

interface ButtonProps {
	socialMedia: {
		name: string;
		image: string;
		link: string;
	}
}

export default class Button extends React.Component<ButtonProps, {}> {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<img
				className={styles.socialButtonImage}
				src={"./images/" + this.props.socialMedia.image}
				onClick={() => {window.open(this.props.socialMedia.link)}}/>
		);
	}
}
