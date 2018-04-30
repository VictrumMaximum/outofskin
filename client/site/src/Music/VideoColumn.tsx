import * as React from "react";
import Video from "./Video";
const styles = require("./styles.less");

interface VideoColumnProps {
	header: string;
	videos: string[]
}

export default class VideoColumn extends React.Component<VideoColumnProps, {}> {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={styles.videoColumn}>
				<h3>{this.props.header}</h3>
				{this.props.videos.map((url) => {
					return (
						<Video url={url}/>
					);
				})}
			</div>
		);
	}
}
