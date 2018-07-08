import * as React from "react";
import * as moment from "moment";
import {TourWithoutID} from "../../../../schemas/TourSchema";
const styles = require("./styles.less");

interface TourProps {
	tour: TourWithoutID;
	showTicketLink: boolean
}

export default class TourComponent extends React.Component<TourProps, {}> {

	render() {
		return (
			<div className={styles.tourComponent}>
				<div className={styles.tourComponentSeparator}/>
				<table>
					<tbody>
						<tr>
							<td className={styles.tourCell}><strong>{moment(this.props.tour.begin).format("DD MMMM HH:mm")}</strong></td>
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
