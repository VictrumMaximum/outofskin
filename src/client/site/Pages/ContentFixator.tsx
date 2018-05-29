import * as React from "react";
const styles = require("./styles.less");

interface ContentFixatorProps {
	content: JSX.Element;
	background: string;
}

export default class ContentFixator extends React.Component<ContentFixatorProps, {}> {

	componentDidMount() {
		document.documentElement.style.backgroundImage = this.props.background;
	}

	render() {
		return (
			<div className={styles.contentFixator}>
				{this.props.content}
			</div>
		);
	}
}
