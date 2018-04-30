import * as React from "react";
const styles = require("./styles.less");

interface VideoProps {
	url: string;
}

export default class Video extends React.Component<VideoProps, {}> {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={styles.videoWrapper}>
				<iframe
					height="100%"
					width="100%"
					src={this.props.url}
					frameBorder="0"
					allowFullScreen>
				</iframe>
			</div>
		);
	}
}
