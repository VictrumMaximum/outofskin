import * as React from "react";
import {live, clips} from "./videos";
import IFrame from "../Templates/IFrame";
import {connect} from "react-redux";
import TwoColumns from "../Templates/TwoColumns";
require("../../media/images/tour.jpg");

export default class MusicContainer extends React.Component<{}, {}> {
	constructor(props) {
		super(props);
	}

	mapToColumnOfVideos(video) {
		return (
			<div className={"row"}>
				<div className={"col-12"}>
					<IFrame source={video}/>
				</div>
			</div>
		);
	}

	render() {
		return (
			<TwoColumns
				leftHeader={"Live"}
				leftContent={live.map(this.mapToColumnOfVideos)}
				rightHeader={"Clips"}
				rightContent={clips.map(this.mapToColumnOfVideos)}/>
		);
	}
}
