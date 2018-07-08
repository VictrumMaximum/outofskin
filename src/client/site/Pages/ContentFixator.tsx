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
		// disabled because all current bgs work on mobile
		// if (window.innerWidth <= 375) {
		// 	backgroundImageURL = "url('../images/"+mobileBg+"')";
		// }
		return (
			<div id={styles.contentFixator}>
				<div
					id={styles.backgroundDiv}
					style={{backgroundImage: backgroundImageURL}}/>
				{this.props.content}
			</div>
		);
	}
}
