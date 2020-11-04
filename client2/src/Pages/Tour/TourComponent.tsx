import * as React from "react";
import {TourJSON} from "../../../../schemas/TourSchema";
import Button from "../../Static/Button";
import styles from "./styles.module.scss";

const monthsDutch = [
	"januari",
	"februari",
	"maart",
	"april",
	"mei",
	"juni",
	"juli",
	"augustus",
	"september",
	"oktober",
	"november",
	"december"
];

interface TourProps {
	tour: TourJSON;
	showButtons: boolean
}

export default class TourComponent extends React.Component<TourProps, {}> {

	static dateToString(date: Date) {
		const pad = (n: number) => (n < 10) ? "0"+n : n;
		return `${pad(date.getDate())} ${monthsDutch[date.getMonth()]} ${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;

	}

	render() {
		const begin: string = this.props.tour.begin;
		return (
			<div className={styles.tourComponent}>
				<div className={styles.tourComponentSeparator}/>
				<table>
					<tbody>
						<tr>
							<td
								className={styles.tourCell}>
								<strong>{begin}</strong>
							</td>
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
