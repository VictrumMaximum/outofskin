import * as React from "react";
const styles = require("./styles.less");

interface ContentFixatorProps {
	content: JSX.Element;
	background: string;
}

import {cover} from "../routes";

export default class ContentFixator extends React.Component<ContentFixatorProps, {}> {

	componentDidMount() {
		if (window.innerWidth <= 375) {
			document.documentElement.style.backgroundImage = "url('../images/"+cover+"')";
		} else {
			document.documentElement.style.backgroundImage = "url('../images/"+this.props.background+"')";
		}
	}

	render() {
		return (
			<div className={styles.contentFixator}>
				{this.props.content}
			</div>
		);
	}
}
