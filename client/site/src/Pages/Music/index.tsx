import * as React from "react";
import {connect} from "react-redux";
import VideoColumn from "./VideoColumn";
import axios, {AxiosResponse} from "axios";

import {musicDataRoute} from "../../../../../server/src/DataRouters/dataRoutes";
import VideoColumnSchema from "../../../../../schemas/VideoColumnSchema";
import {setVideos} from "../../redux/actions/music";

interface MusicProps {
	background: string;
	setVideos,
	left: VideoColumnSchema,
	right: VideoColumnSchema
}

class MusicContainer extends React.Component<MusicProps, {}> {

	componentDidMount() {
		document.documentElement.style.backgroundImage = this.props.background;
		this.fetchVideos();
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
			<div>
				<VideoColumn header={this.props.left.title} videos={this.props.left.videos}/>
				<VideoColumn header={this.props.right.title} videos={this.props.right.videos}/>
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
