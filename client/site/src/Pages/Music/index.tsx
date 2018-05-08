import * as React from "react";
import {live, clips} from "./videos";
import {connect} from "react-redux";
import VideoColumn from "./VideoColumn";

interface MusicProps {
	background: string;	
}

export default class MusicContainer extends React.Component<MusicProps, {}> {
	constructor(props) {
		super(props);
		//document.documentElement.style.backgroundImage = props.background;
	}

	componentDidMount() {
		document.documentElement.style.backgroundImage = this.props.background;
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
