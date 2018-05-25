import * as React from "react";
const styles = require("./styles.less");

interface EditColumnProps {
	header: string;
	videos: string[],
	handleChange
}

export default class EditColumn extends React.Component<EditColumnProps, {}> {
	constructor(props) {
		super(props);
	}

	handleHeaderChange(event) {
		this.props.handleChange({
			header: event.target.value,
			videos: this.props.videos
		});
	}

	handleVideoChange(index, event) {
		const videos = this.props.videos;
		videos[index] = event.target.value;
		this.props.handleChange({
			header: this.props.header,
			videos
		});
	}

	handleRemoveVideo(index, event) {
		console.log("remove video: " + index);
		const videos = this.props.videos;
		videos.splice(index, 1);
		console.log(videos);
		this.props.handleChange({
			header: this.props.header,
			videos
		});
	}

	handleAddVideo() {
		const videos = this.props.videos;
		videos.push("");
		this.props.handleChange({
			header: this.props.header,
			videos
		});
	}

	render() {
		return (
			<div className={styles.editColumn}>
				<input
				value={this.props.header}
				onChange={this.handleHeaderChange.bind(this)}/>
				{this.props.videos.map((video, index) => {
					return (<div key={index}>
						<input
							value={video}
							onChange={this.handleVideoChange.bind(this, index)}/>
						<button onClick={this.handleRemoveVideo.bind(this, index)}>Remove</button>
					</div>);
				})}
				<button onClick={this.handleAddVideo.bind(this)}>Add</button>
			</div>
		);
	}
}
