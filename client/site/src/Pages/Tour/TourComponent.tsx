import * as React from "react";
import * as moment from "moment";
import {Tour} from "../../../../../schemas/TourSchema";
const styles = require("./styles.less");

interface TourProps {
	tour: Tour;
	showTicketLink: boolean
}

export default class TourComponent extends React.Component<TourProps, {}> {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={styles.tourComponent}>
				<table>
					<tbody>
						<tr>
							<td className={styles.tourCell}>{moment(this.props.tour.begin).format("DD MMMM HH:mm")}</td>
						</tr>
						<tr>
							<td>{this.props.tour.eventName}</td>
							{this.props.showTicketLink ?
								(<td><div className={styles.boxLink} onClick={() => {window.open(this.props.tour.eventLink)}}>Tickets</div></td>) :
								(<td/>)}
						</tr>
						<tr>
							<td>{this.props.tour.location}, {this.props.tour.city}</td>
							<td><div className={styles.boxLink} onClick={() => {window.open(this.props.tour.locationLink)}}>Maps</div></td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}
