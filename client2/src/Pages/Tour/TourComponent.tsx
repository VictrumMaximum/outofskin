import * as React from "react";
import {TourJSON} from "../../../../schemas/TourSchema";
import Button from "../../Static/Button";
import styles from "./styles.module.scss";
import {classNameSeparator} from "../../util";

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

	private prettyDate(date: string) {
		const [d, t] = date.split(" ");
		const [year, month, day] = d.split("-");
		return `${day} ${monthsDutch[parseInt(month) - 1]} ${year} ${t}`;
	}

	getTourButton(text, link) {
		return <div
			className={classNameSeparator(styles.button)}
			onClick={() => window.open(link)}>
			{text}</div>
	}

	render() {
		const begin: string = this.props.tour.begin;
		return (
			<div className={styles.tourComponent}>
				<div className={styles.tourComponentSeparator}/>
				<table>
					<tbody>
						<tr>
							<td>
								<strong>{this.prettyDate(begin)}</strong>
							</td>
						</tr>
						<tr>
							<td><i>{this.props.tour.eventName}</i></td>
						</tr>
						<tr>
							<td>{this.props.tour.location}{(this.props.tour.city.length > 0) ? (", "+this.props.tour.city):""}</td>
						</tr>
					</tbody>
				</table>
				<div className={styles.buttonContainer}>
					{this.props.showButtons &&
						this.getTourButton("Stream", this.props.tour.eventLink)}
					{/*(<Button text={"Stream"} action={() => {window.open(this.props.tour.eventLink)}} height={"0.3em"}/>)}*/}
					{this.props.showButtons &&
						this.getTourButton("Info", this.props.tour.infoLink)}
					 {/*(<Button text={"Info"} action={() => {window.open(this.props.tour.infoLink)}} height={"0.3em"}/>)}*/}
				</div>
			</div>
		);
	}
}
