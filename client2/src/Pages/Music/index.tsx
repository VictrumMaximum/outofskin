import * as React from "react";
import styles from "./styles.module.scss";
import Video from "./Video";

export default class MusicContainer extends React.Component<{}, {}> {
	firstVideo = "";
	videos = [];
	render() {
		const videoElements: any[] = [];
		videoElements.push(
			<div id={styles.bigVideo} className={styles.videoRow}>
				<Video key={this.firstVideo} videoId={this.firstVideo} />;
			</div>);
		while (this.videos.length > 0) {
			const rowVideos = this.videos.splice(0, 2);
			videoElements.push(
				<div className={styles.videoRow}>
					{rowVideos.map((videoId) => {
						return <Video key={videoId} videoId={videoId} />
					})}
				</div>);
		}
		return (
			<div id={styles.columnWrapper}>
				{videoElements}
			</div>
		);
	}
}
