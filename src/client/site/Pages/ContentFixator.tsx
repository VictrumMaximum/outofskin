import * as React from "react";
const styles = require("./styles.less");

interface ContentFixatorProps {
	content: JSX.Element;
}

export default class ContentFixator extends React.Component<ContentFixatorProps, {}> {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={styles.contentFixator}>
				{this.props.content}
			</div>
		);
	}
}
