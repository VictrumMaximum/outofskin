import * as React from "react";
import * as moment from "moment";
import {TourWithoutID} from "../../../../schemas/TourSchema";
import Button from "../../Static/Button";
const styles = require("./styles.less");

interface TourProps {
	tour: TourWithoutID;
	showButtons: boolean
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
							<td><i>{this.props.tour.eventName}</i></td>
							{this.props.showButtons ?
								(<td><Button text={"Tickets"} action={() => {window.open(this.props.tour.eventLink)}} height={"0.3em"}/></td>) :
								(<td/>)}
						</tr>
						<tr>
							<td>{this.props.tour.location}{(this.props.tour.city.length > 0) ? (", "+this.props.tour.city):""}</td>
							{this.props.showButtons ?
								<td><Button text={"Location"} action={() => {window.open(this.props.tour.locationLink)}} height={"0.3em"}/></td> :
							<td/>}

						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}
