import * as React from "react";
const styles = require("./styles.less");

import {mobileBg} from "../routes";
import {MainContainerState} from "../MainContainer";

interface ContentFixatorProps {
	content: JSX.Element;
	background: string;
	style: MainContainerState;
}

export default class ContentFixator extends React.Component<ContentFixatorProps, {}> {

	componentDidMount() {
		const list = document.getElementsByTagName("H3");
		for (let i = 0; i < list.length; i++) {
			list[i]["style"].color = this.props.style.headerColor;
			list[i]["style"].fontSize = this.props.style.headerSize + "px";
		}
	}

	render() {
		let backgroundImageURL = "url('../images/"+this.props.background+"')";
		// disabled because all current bgs work on mobile
		// if (window.innerWidth <= 375) {
		// 	backgroundImageURL = "url('../images/"+mobileBg+"')";
		// }
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
