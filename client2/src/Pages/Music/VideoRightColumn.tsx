import * as React from "react";
import Video from "./Video";
import styles from "./styles.module.scss";

interface VideoColumnProps {
	header: string;
	videos: string[]
}

export default class VideoRightColumn extends React.Component<VideoColumnProps, {}> {

	render() {
		return (
			<div className={styles.videoColumn + " " + styles.videoRightColumn}>
				<h2>{this.props.header}</h2>
				{this.props.videos.map((videoId) => {
					return (
						<Video key={videoId} videoId={videoId}/>
					);
				})}
			</div>
		);
	}
}
