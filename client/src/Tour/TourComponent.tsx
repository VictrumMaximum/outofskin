import * as React from "react";
import * as moment from "moment";
import {Tour} from "../TourMenu/TourSchema";
const styles = require("./tourStyle.less");

interface TourProps {
	tour: Tour;
}

export default class TourComponent extends React.Component<TourProps, {}> {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={styles.tourComponent}>
				<span>{moment(this.props.tour.begin).format("DD MMMM HH:mm")}</span><br/>
				<span>{this.props.tour.event}</span><br/>
				<span>{this.props.tour.establishment}, {this.props.tour.city}</span>
			</div>
		);
	}
}
