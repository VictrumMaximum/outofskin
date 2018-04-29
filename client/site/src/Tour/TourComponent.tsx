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
				<table>
					<tr>
						<td style={{width: "16em"}}>{moment(this.props.tour.begin).format("DD MMMM HH:mm")}</td>
					</tr>
					<tr>
						<td>{this.props.tour.eventName}</td>
						<td><div className={styles.boxLink}>Tickets</div></td>
					</tr>
					<tr>
						<td>{this.props.tour.location}, {this.props.tour.city}</td>
						<td><div className={styles.boxLink}>Maps</div></td>
					</tr>
				</table>
			</div>
		);
	}
}
