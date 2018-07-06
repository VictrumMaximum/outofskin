import * as React from "react";
import Video from "./Video";
const styles = require("./styles.less");

interface VideoColumnProps {
	header: string;
	videos: string[]
}

export default class VideoLeftColumn extends React.Component<VideoColumnProps, {}> {

	render() {
		return (
			<div className={styles.videoColumn + " " + styles.videoLeftColumn}>
				<h3>{this.props.header}</h3>
				{this.props.videos.map((videoId) => {
					return (
						<Video key={videoId} videoId={videoId}/>
					);
				})}
			</div>
		);
	}
}
