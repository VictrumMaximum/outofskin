import * as React from "react";
import {musicDataRoute} from "../../../../server/src/DataRouters/dataRoutes";
import {AxiosResponse} from "axios";
import axios from "axios";
import VideoColumnSchema from "../../../../schemas/VideoColumnSchema";
import EditColumn from "./EditColumn";
import {connect} from "react-redux";

interface MusicState {
	left: VideoColumnSchema,
	right: VideoColumnSchema,
}

export default class Music extends React.Component<{}, MusicState> {
	constructor(props) {
		super(props);
		this.state = {
			left: {
				header: "",
				videos: []
			},
			right: {
				header: "",
				videos: []
			}
		};
		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleLeftChange = this.handleLeftChange.bind(this);
		this.handleRightChange = this.handleRightChange.bind(this);
	}

	componentDidMount() {
		this.fetchVideos();
	}

	fetchVideos() {
		axios.get(musicDataRoute).then((response: AxiosResponse) => {
			const responseData = response.data;
			if (responseData.error) {
				console.log(JSON.stringify(responseData.error, null, 2));
			}
			else {
				console.log(responseData.data);
				this.setState({
					left: responseData.data.left,
					right: responseData.data.right
				});
			}
		});
	}

	handleUpdate() {
		const newMusic = {left: this.state.left, right: this.state.right};
		axios.patch(musicDataRoute, newMusic).then((response: AxiosResponse) => {
			const responseData = response.data;
			if (responseData.error) {
				console.log(JSON.stringify(responseData.error, null, 2));
				alert("Something went wrong, contact me");
			}
			else {
				console.log("success");
			}
		});
	}

	handleLeftChange(newLeft) {
		this.setState({
			left: newLeft
		})
	}

	handleRightChange(newRight) {
		this.setState({
			right: newRight
		})
	}

	render() {
		return (
			<div>
				<EditColumn
					header={this.state.left.header}
					videos={this.state.left.videos}
					handleChange={this.handleLeftChange}/>
				<EditColumn
					header={this.state.right.header}
					videos={this.state.right.videos}
					handleChange={this.handleRightChange}/>
				<button onClick={this.handleUpdate}>Update</button>
			</div>
		);
	}
}
