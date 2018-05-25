import * as React from "react";
import TourComponent from "./TourComponent";
import {Tour} from "../../../../schemas/TourSchema";
const styles = require("./styles.less");

interface TourColumnProps {
	tours: Tour[];
	header: string;
	showTicketLink: boolean,
	sortAscending: boolean
}

export default class TourColumn extends React.Component<TourColumnProps, {}> {
	constructor(props) {
		super(props);
	}

	render() {
		let tours = this.props.tours;
		if (!this.props.sortAscending) {
			// create a new array as reverse of tours
			tours = [];
			for (let i = this.props.tours.length - 1; i >= 0; i--) {
				tours.push(this.props.tours[i]);
			}
		}
		return (
			<div className={styles.tourColumn}>
				<h3>{this.props.header}</h3>
				{tours.map((tour) => {
					return <TourComponent key={tour.begin.format("DD MMMM HH:mm")} showTicketLink={this.props.showTicketLink} tour={tour} />
				})}
			</div>
		);
	}
}
