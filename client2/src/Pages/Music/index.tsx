import * as React from "react";
import {connect} from "react-redux";
import axios, {AxiosResponse} from "axios";
import VideoColumnSchema from "../../../../schemas/VideoColumnSchema";
import {setVideos} from "../../redux/actions/music";
import VideoLeftColumn from "./VideoLeftColumn";
import VideoRightColumn from "./VideoRightColumn";
import styles from "./styles.module.scss";

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
		return (
			<div id={styles.columnWrapper} className={"col"}>
				<VideoLeftColumn header={this.props.left.header} videos={this.props.left.videos}/>
				<VideoRightColumn header={this.props.right.header} videos={this.props.right.videos}/>
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
