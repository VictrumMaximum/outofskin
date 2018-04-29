import * as React from "react";
import TourComponent from "./TourComponent";
import {Tour} from "../../../../schemas/TourSchema";
const styles = require("./styles.less");

interface TourColumnProps {
	tours: Tour[];
	header: string;
}

export default class TourColumn extends React.Component<TourColumnProps, {}> {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={styles.tourColumn}>
				<h3>{this.props.header}</h3>
				{this.props.tours.map((tour) => {
					return <TourComponent key={tour.begin.format("DD MMMM HH:mm")} tour={tour} />
				})}
			</div>
		);
	}
}
