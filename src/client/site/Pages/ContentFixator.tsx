import * as React from "react";
const styles = require("./styles.less");

interface ContentFixatorProps {
	content: JSX.Element;
	background: string;
}

import {mobileBg} from "../routes";

export default class ContentFixator extends React.Component<ContentFixatorProps, {}> {

	render() {
		let backgroundImageURL = "url('../images/"+this.props.background+"')";
		if (window.innerWidth <= 375) {
			backgroundImageURL = "url('../images/"+mobileBg+"')";
		}
		return (
			<div className={styles.contentFixator}>
				<div
					className={styles.backgroundDiv}
					style={{backgroundImage: backgroundImageURL}}/>
				{this.props.content}
			</div>
		);
	}
}
