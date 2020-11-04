import * as React from "react";
import styles from "./styles.module.scss";
import Video from "./Video";
import videos from "../../data/music";

export default class MusicContainer extends React.Component<{}, {}> {
	render() {
		return (
			<div id={styles.columnWrapper}>
				{videos.map((id) => <Video videoId={id} key={id} />)}
			</div>
		);
	}
}
