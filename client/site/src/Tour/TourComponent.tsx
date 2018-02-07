import * as React from "react";
import * as moment from "moment";
import {Tour} from "../../../../schemas/TourSchema";
const styles = require("./styles.less");

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
				<span>{moment(this.props.tour.begin).format("DD MMMM HH:mm")}</span>
				<span> {this.props.tour.eventName}</span>
				<span> {this.props.tour.location}, {this.props.tour.city} </span>
				<span style={{border: "1px solid black"}}>tickets</span>
			</div>
		);
	}
}
