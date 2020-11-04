import * as React from "react";
import styles from "./styles.module.scss";

interface VideoProps {
	videoId: string;
}

interface VideoState {
	clicked: boolean
}


export default class Video extends React.Component<VideoProps, VideoState> {
	constructor(props) {
		super(props);
		this.state = {
			clicked: false
		};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.setState({
			clicked: true
		});
	}

	render() {
		const content = this.state.clicked ?
			(<iframe
				title={this.props.videoId}
				src={"https://www.youtube.com/embed/" + this.props.videoId +"?rel=0&showinfo=0&autoplay=1"}
				frameBorder="0"
				allowFullScreen>

			</iframe>)
			: (<div onClick={this.handleClick}>
					<img
						src={"https://i.ytimg.com/vi/" + this.props.videoId + "/maxresdefault.jpg"}
						alt={""}
					/>
					<div className={styles.playButton} />
				</div>
				);
		return (
			<div className={styles.youtube}>
				{content}
			</div>
		);
	}
}
