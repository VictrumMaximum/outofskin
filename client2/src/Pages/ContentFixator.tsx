import * as React from "react";
import {mobileBg} from "../routes";
import styles from "./styles.module.scss";

interface ContentFixatorProps {
	content: JSX.Element;
	background: string;
}


export default class ContentFixator extends React.Component<ContentFixatorProps, {}> {

	render() {
		console.log(styles);
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
				<div id={styles.contentOffsetter}>
				{this.props.content}
				</div>
			</div>
		);
	}
}
