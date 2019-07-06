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

	render() {
		return (
			<div className={styles.socialMediaButtonImageWrapper}>
				{/*<ReactSVG*/}
				{/*	path={"../images/" + this.props.socialMedia.image + ".svg"}*/}
				{/*	svgClassName={styles.socialButtonImage}*/}
				{/*	onClick={() => {window.open(this.props.socialMedia.link)}}*/}
				{/*/>*/}
			</div>
		);
	}
}
