import * as React from "react";
import {connect} from "react-redux";
import axios, {AxiosResponse} from "axios";
import VideoColumnSchema from "../../../../schemas/VideoColumnSchema";
import {setVideos} from "../../redux/actions/music";
import styles from "./styles.module.scss";
import Video from "./Video";

interface MusicProps {
	setVideos,
	left: VideoColumnSchema,
	right: VideoColumnSchema
}

const musicDataRoute = "/musicData";

class MusicContainer extends React.Component<MusicProps, {}> {

	componentDidMount() {
		if (this.props.left.videos.length === 0 && this.props.right.videos.length === 0) {
			this.fetchVideos();
		}
	}

	fetchVideos() {
		axios.get(musicDataRoute).then((response: AxiosResponse) => {
			const responseData = response.data;
			if (responseData.error) {
				console.log(JSON.stringify(responseData.error, null, 2));
			}
			else {
				this.props.setVideos(responseData.data.left, responseData.data.right);
			}
		});
	}

	render() {
		const videoElements: any[] = [];
		const videosCopy = [...this.props.right.videos];
		const firstVideo = videosCopy.splice(0, 1)[0];
		videoElements.push(
			<div id={styles.bigVideo} className={styles.videoRow}>
				<Video key={firstVideo} videoId={firstVideo} />;
			</div>);
		while (videosCopy.length > 0) {
			const rowVideos = videosCopy.splice(0, 2);
			videoElements.push(
				<div className={styles.videoRow}>
					{rowVideos.map((videoId) => {
						return <Video key={videoId} videoId={videoId} />
					})}
				</div>);
		}
		const videos = this.props.right.videos.map((videoId) => {
			return <Video key={videoId} videoId={videoId} />;
		});
		return (
			<div id={styles.columnWrapper}>
				{videos}

				{/*<VideoLeftColumn header={this.props.left.header} videos={this.props.left.videos}/>*/}
				{/*<VideoRightColumn header={this.props.right.header} videos={this.props.right.videos}/>*/}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		left: state.music.left,
		right: state.music.right
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		setVideos: (left: VideoColumnSchema, right: VideoColumnSchema) => dispatch(setVideos(left, right))
	}
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MusicContainer)
