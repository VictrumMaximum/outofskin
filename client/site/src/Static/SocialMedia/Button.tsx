import * as React from "react";
const styles = require("./styles.less");

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
			<div style={{marginTop: "0.5em", marginBottom: "0.5em"}}>
				<img className={styles.socialButtonImage} src={"./images/" + this.props.socialMedia.image} />
			</div>
		);
	}
}
