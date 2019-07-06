import * as React from "react";
import {TourWithoutID} from "../../../../schemas/TourSchema";
import Button from "../../Static/Button";
import styles from "./styles.module.scss";

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
							<td className={styles.tourCell}><strong>{new Date(this.props.tour.begin).toDateString()}</strong></td>
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
