import * as React from "react";
import {live, clips} from "./videos";
import {connect} from "react-redux";
import VideoColumn from "./VideoColumn";

export default class MusicContainer extends React.Component<{}, {}> {
	constructor(props) {
		super(props);
		document.documentElement.style.backgroundImage = props.background;
	}

	render() {
		return (
			<div>
				<VideoColumn header={"Live"} videos={live}/>
				<VideoColumn header={"Clips"} videos={clips}/>
			</div>
		);
	}
}
